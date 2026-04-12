import { expect, test } from '@playwright/test';

test('loads app shell', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Tic-Tac-Toe' }).first()
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Options' }).first()
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Score Card' }).first()
  ).toBeVisible();
});

test('can click a board cell', async ({ page }) => {
  await page.goto('/');
  // Click the first available board cell (top-left)
  const cells = page.locator('[data-square]');
  await cells.first().click();
  // After a move, total moves indicator in debug panel should show 1
  await expect(page.getByText('Total Moves: 1')).toBeVisible();
});

test('reset clears the board', async ({ page }) => {
  await page.goto('/');
  const cells = page.locator('[data-square]');
  await cells.first().click();
  await page.getByRole('button', { name: 'RESET' }).click();
  await expect(page.getByText('Total Moves: 0')).toBeVisible();
});
