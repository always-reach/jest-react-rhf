/**
 * @jest-environment jsdom
 */

import { describe } from '@jest/globals'
import { screen, fireEvent, waitFor } from '@testing-library/react';
const { toBeInTheDocument } = require('@testing-library/jest-dom')


describe("Login", () => {
    test("first test", async () => {
        expect(1).toBe(1)
    })
})