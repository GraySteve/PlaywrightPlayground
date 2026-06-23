import { Locator } from "@playwright/test";
import { logger } from "./logger";

export interface WaitOptions {
  timeout?: number;
  message?: string;
}

export class WaitUtils {
  private static readonly DEFAULT_TIMEOUT = 10000;

  static async waitForElement(
    locator: Locator,
    options: WaitOptions = {}
  ): Promise<void> {
    const timeout = options.timeout ?? this.DEFAULT_TIMEOUT;
    const waitMessage = options.message || 'Element';
    
    logger.debug(`Starting wait for element: ${waitMessage}`, { timeout });
    
    try {
      await locator.waitFor({ state: 'visible', timeout });
      logger.info(`Successfully waited for element: ${waitMessage}`, { timeout });
    } catch (error) {
      const errorMsg = `${waitMessage} did not appear within ${timeout}ms`;
      logger.error(errorMsg, error as Error, { timeout, message: waitMessage });
      throw new Error(errorMsg);
    }
  }

  static async waitForCondition(
    condition: () => Promise<boolean>,
    options: WaitOptions = {}
  ): Promise<void> {
    const timeout = options.timeout ?? this.DEFAULT_TIMEOUT;
    const startTime = Date.now();
    const waitMessage = options.message || 'Condition';
    
    logger.debug(`Starting wait for condition: ${waitMessage}`, { timeout });

    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        const duration = Date.now() - startTime;
        logger.info(`Condition met: ${waitMessage}`, { timeout, actualDuration: duration });
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const errorMsg = `${waitMessage} was not met within ${timeout}ms`;
    logger.error(errorMsg, new Error(errorMsg), { timeout, message: waitMessage });
    throw new Error(errorMsg);
  }

  static async waitForElementState(
    locator: Locator,
    state: 'visible' | 'hidden' | 'stable',
    options: WaitOptions = {}
  ): Promise<void> {
    const timeout = options.timeout ?? this.DEFAULT_TIMEOUT;
    const waitMessage = options.message || `Element state: ${state}`;
    
    logger.debug(`Waiting for element state: ${state}`, { timeout, message: waitMessage });
    
    try {
      await locator.waitFor({ state: state as any, timeout });
      logger.info(`Element state achieved: ${state}`, { timeout, message: waitMessage });
    } catch (error) {
      const errorMsg = `Failed to achieve state '${state}' for ${waitMessage} within ${timeout}ms`;
      logger.error(errorMsg, error as Error, { timeout, state, message: waitMessage });
      throw new Error(errorMsg);
    }
  }
}