import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Header } from "./components/header";
import { ProductCard } from "./components/productCard";

export class CatalogPage extends BasePage {
    readonly header: Header;
    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
    }
    private get _inventoryItem(): Locator {
        return this.page.locator('.inventory_item');
    }
    private get _titleCatalog(): Locator {
        return this.page.locator('.title');
    }
    private get _productContainer(): Locator {
        return this.page.locator('.inventory_item');
    }
    async products(): Promise<ProductCard[]> {
        return (await this._productContainer.all()).map(locator => new ProductCard(this.page, locator));
    }
    async open(): Promise<void> {
        await super.open('/inventory.html');
    }
    async isPageTitleVisible(): Promise<boolean> {
        return await this._titleCatalog.isVisible();
    }
    async waitForPageToLoad(): Promise<void> {
        await this._titleCatalog.waitFor({ state: 'visible' });
    }
    async getProductCount(): Promise<number> {
        return await this._inventoryItem.count();
    }
}