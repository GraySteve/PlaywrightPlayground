import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Header } from "./components/header";

export class ProductDescriptionPage extends BasePage {
    readonly header: Header;
    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
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
        await this._removeFromCartButton.waitFor({ state: 'visible' });
    }

    async removeFromCart(): Promise<void> {
        await this._removeFromCartButton.click();
        await this._addToCartButton.waitFor({ state: 'visible' });
    }

    async backToProductsPage(): Promise<void> {
        await this.header.goBackToProductsPage();
    }
}