import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Header } from "./components/header";
import { WaitUtils } from "../utils/waitUtils";

export class ProductDescriptionPage extends BasePage {
    readonly header: Header;
    
    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
    }

    private get _productImage(): Locator {
        return this.page.locator('.inventory_details_img');
    }
    private get _productTitle(): Locator {
        return this.page.locator('.inventory_details_name');
    }
    private get _productDescription(): Locator {
        return this.page.locator('.inventory_details_desc');
    }
    private get _productPrice(): Locator {
        return this.page.locator('.inventory_details_price');
    }
    private get _addToCartButton(): Locator {
        return this.page.getByRole('button', { name: /add to cart/i });
    }
    private get _removeFromCartButton(): Locator {
        return this.page.getByRole('button', { name: /remove/i });
    }

    async open(productId: string): Promise<void> {
        await super.open(`/inventory-item.html?id=${productId}`);
    }

    async isProductTitleVisible(): Promise<boolean> {
        return await this._productTitle.isVisible();
    }

    async isProductDescriptionVisible(): Promise<boolean> {
        return await this._productDescription.isVisible();
    }

    async isProductPriceVisible(): Promise<boolean> {
        return await this._productPrice.isVisible();
    }

    async addToCart(): Promise<void> {
        await this._addToCartButton.click();
        await WaitUtils.waitForElementState(this._removeFromCartButton, 'visible', { message: 'Remove from Cart button' });
    }

    async removeFromCart(): Promise<void> {
        await this._removeFromCartButton.click();
        await WaitUtils.waitForElement(this._addToCartButton, { message: 'Add to Cart button' });
    }

    async backToProductsPage(): Promise<void> {
        await this.header.goBackToProductsPage();
    }

    async waitForPageToLoad(): Promise<void> {
        await WaitUtils.waitForCondition(async () => await this.isProductTitleVisible(), { message: 'Product Description Page to load' });
        await WaitUtils.waitForCondition(async () => await this.isProductImageVisible(), { message: 'Product Description to be visible' });
    }
    async isProductImageVisible(): Promise<boolean> {
        return await this._productImage.isVisible();
    }
}