/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

test("should be able to add a new comment and reply from another user", async ({
  page,
  context,
}) => {
  // Go to the homepage
  await page.goto("http://localhost:3000/");

  // Verify the welcome message is visible
  await expect(page.getByText("Welcome to camp nou")).toBeVisible();

  // Wait for authentication to complete
  await page.waitForResponse("https://getalloweddocuments.api.velt.dev/");

  // Add a new comment
  await page.locator("velt-comment-tool").getByRole("img").click();

  // Select a random position on the comment area
  const commentArea = await page.locator("#pictures");
  const boundingBox = await commentArea.boundingBox();
  if (boundingBox) {
    const x = boundingBox.x + Math.floor(Math.random() * boundingBox.width);
    const y = boundingBox.y + Math.floor(Math.random() * boundingBox.height);
    await page.mouse.click(x, y);
  }

  // Fill in the comment by the first user
  const commentByFirstUser = `nice assist ${Date.now().toString()}`;
  await page
    .locator("app-comment-dialog-composer-input div")
    .nth(2)
    .fill(commentByFirstUser);

  // Mention one of the team members
  await page
    .locator("app-comment-dialog-composer-input div")
    .nth(2)
    .pressSequentially("@pedri");
  await page.getByText("Pedri", { exact: true }).click();

  // Submit the comment
  await page.locator(".velt-composer--submit-button").click();

  // Verify the comment and author
  await expect(
    page
      .locator("app-comment-dialog-thread-card div")
      .filter({ hasText: "Me now" })
      .nth(2)
  ).toBeVisible();
  await expect(page.getByText(commentByFirstUser)).toBeVisible();

  // Add a reaction on the comment
  await page.locator("app-reaction-tool").getByRole("img").click();
  await page
    .locator(
      "velt-reactions-panel-item-internal:nth-child(3) > .velt-reactions-panel-item"
    )
    .click();
  await page
    .locator("app-overlay-tooltip div")
    .filter({ hasText: "1" })
    .nth(3)
    .click();

  // Open a new tab
  const page2 = await context.newPage();
  await page2.goto("http://localhost:3000/");

  // Wait for authentication to complete
  await page2.waitForResponse("https://getalloweddocuments.api.velt.dev/");

  // Get the second user name
  const secondProfile = await page2
    .getByRole("heading", { name: /Profile/i })
    .textContent();
  const secondUserName = secondProfile?.split(" - ")[1];

  // Open the comment sidebar
  await page2.locator("velt-sidebar-button div").nth(1).click();

  // Search for the first user comment
  await expect(page2.getByPlaceholder("Search comments")).toBeVisible();
  await page2.getByPlaceholder("Search comments").fill(commentByFirstUser);
  await expect(page2.getByText(commentByFirstUser).first()).toBeVisible();

  // Reply to the comment
  await page2.getByText(commentByFirstUser).first().hover();
  await page2.getByText("Reply").click();
  const commentBySecondUser = `Thanks ${Date.now().toString()}`;
  await page2
    .locator("app-comment-dialog-composer-input div")
    .nth(2)
    .fill(commentBySecondUser);
  await page2.locator(".velt-composer--submit-button").click();

  // Close the sidebar
  await page2
    .locator("app-comment-sidebar-close-button")
    .getByRole("img")
    .click();

  // Switch back to the first tab
  await page.bringToFront();

  // Verify the comment and author in the first tab
  await expect(
    page
      .locator("app-comment-dialog-thread-card div")
      .filter({ hasText: secondUserName })
      .nth(2)
  ).toBeVisible();
  await expect(page.getByText(commentBySecondUser)).toBeVisible();

  // Delete the comment thread
  await page.locator("app-comment-dialog-options div").nth(1).click();
  await page
    .locator("app-comment-dialog-options-dropdown-content-delete div")
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Delete" }).click();
});

test("should be able to add a new comment and assign it another user", async ({
  page,
  context,
}) => {
  // Go to the homepage
  await page.goto("http://localhost:3000/");

  // Verify the welcome message is visible
  await expect(page.getByText("Welcome to camp nou")).toBeVisible();

  // Wait for authentication to complete
  await page.waitForResponse("https://getalloweddocuments.api.velt.dev/");

  // Add a new comment
  await page.locator("velt-comment-tool").getByRole("img").click();

  // Select a random position on the comment area
  const commentArea = await page.locator("#pictures");
  const boundingBox = await commentArea.boundingBox();
  if (boundingBox) {
    const x = boundingBox.x + Math.floor(Math.random() * boundingBox.width);
    const y = boundingBox.y + Math.floor(Math.random() * boundingBox.height);
    await page.mouse.click(x, y);
  }

  // Fill in the comment by the first user
  const commentByFirstUser = `nice assist ${Date.now().toString()}`;
  await page
    .locator("app-comment-dialog-composer-input div")
    .nth(2)
    .fill(commentByFirstUser);

  // Submit the comment
  await page.locator(".velt-composer--submit-button").click();

  // Verify the comment and author
  await expect(
    page
      .locator("app-comment-dialog-thread-card div")
      .filter({ hasText: "Me now" })
      .nth(2)
  ).toBeVisible();
  await expect(page.getByText(commentByFirstUser)).toBeVisible();

  // Assign to another user
  await page.locator("app-comment-dialog-options div").nth(1).click();
  await page.getByText("Assign comment").click();
  await page.getByPlaceholder("Search", { exact: true }).fill("gavi");
  await page.getByText("Gavi", { exact: true }).click();
  await expect(page.getByText("Assigned to:Gavi")).toBeVisible();

   // Delete the comment thread
   await page.locator("app-comment-dialog-options div").nth(1).click();
   await page
     .locator("app-comment-dialog-options-dropdown-content-delete div")
     .nth(1)
     .click();
   await page.getByRole("button", { name: "Delete" }).click();
});
