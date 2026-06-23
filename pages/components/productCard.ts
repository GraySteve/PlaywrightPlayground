import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "./baseComponent";
import { Header } from "./header";
import { logger } from "../../utils/logger";
import { WaitUtils } from "../../utils/waitUtils";
import { ProductDescriptionPage } from "../../pages/productDescriptionPage";

export class ProductCard extends BaseComponent {
    constructor(page: Page, rootLocator: Locator) {
        super(page, rootLocator);
    }

    private async getTrimmedText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() ?? '';
    }

    private get _productName(): Locator {
        return this.root.locator('[data-test="inventory-item-name"]');
    }
    private get _productPrice(): Locator {
        return this.root.locator('[data-test="inventory-item-price"]');
    }
    private get _productImage(): Locator {
        return this.root.locator('img.inventory_item_img');
    }
    private get _addToCartButton(): Locator {
        return this.root.getByRole('button', { name: /add to cart/i });
    }
    private get _removeFromCartButton(): Locator {
        return this.root.getByRole('button', { name: /remove/i });
    }

    async getProductName(): Promise<string> {
        return this.getTrimmedText(this._productName);
    }
    async isProductNameVisible(): Promise<boolean> {
        return await this._productName.isVisible();
    }
    async getProductPrice(): Promise<string> {
        return this.getTrimmedText(this._productPrice);
    }
    async isProductPriceVisible(): Promise<boolean> {
        return await this._productPrice.isVisible();
    }
    async isProductImageVisible(): Promise<boolean> {
        return await this._productImage.isVisible();
    }
    async addToCart(): Promise<void> {
        logger.info('Adding product to cart', { product: await this.getProductName() });
        await this._addToCartButton.click();
        await WaitUtils.waitForElementState(this._removeFromCartButton, 'visible', { message: 'Remove from Cart button' });
        await new Header(this.page).waitForCartbadgeToAppear();
    }
    async removeFromCart(): Promise<void> {
        logger.info('Removing product from cart', { product: await this.getProductName() });
        await this._removeFromCartButton.click();
        await WaitUtils.waitForElementState(this._addToCartButton, 'visible', { message: 'Add to Cart button' });
    }
    async navigateToProductDetails(): Promise<ProductDescriptionPage> {
        await this._productName.click();
        const productDetailsPage = new ProductDescriptionPage(this.page);
        await productDetailsPage.waitForPageToLoad();
        return productDetailsPage;
    }
}