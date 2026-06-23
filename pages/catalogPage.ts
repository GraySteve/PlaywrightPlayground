import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Header } from "./components/header";
import { ProductCard } from "./components/productCard";
import { logger } from "../utils/logger";

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
    async products(): Promise<ProductCard[]> {
        logger.info('Fetching products from catalog', { selector: this._inventoryItem.toString() });
        try {
            const items = await this._inventoryItem.all();
            logger.info('Successfully fetched products', { count: items.length });
            return items.map(locator => new ProductCard(this.page, locator));
        } catch (error) {
            logger.error('Failed to fetch products', error as Error, { selector: this._inventoryItem.toString() });
            throw error;
        }
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