/**
 * @jest-environment jsdom
 */

import { describe } from '@jest/globals'
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { appRenderer } from './Helper/RenderHelper';
import MUISignIn from '../pages/mui/SignIn'
const { toBeInTheDocument } = require('@testing-library/jest-dom')

const loginMock=()=>{
    new Promise((resolve)=>{
        resolve({ok:true,status:200})
    })
}

describe("Login", () => {
    test("メールアドレス入力欄テスト", () => {
        appRenderer(<MUISignIn />)
        const email = screen.getByRole("textbox", { name: "Email Address" })
        fireEvent.input(email, { target: { value: "test" } })
        expect(email).toHaveValue("test")
    }),
        test("メールアドレス空欄バリデーションテスト", async () => {
            appRenderer(<MUISignIn />)
            const email = screen.getByRole("textbox", { name: "Email Address" })
            const button = screen.getByRole("button", { name: "Sign In" })
            fireEvent.input(email, { target: { value: "" } })
            fireEvent.submit(button)
            await waitFor(() => {
                const helperText = screen.getAllByText("必須入力欄です").find((x) => x.id === "email-helper-text")
                expect(helperText).toBeInTheDocument()
            })
            expect(email).toHaveAttribute("aria-invalid", "true")
        }),
        test("メールアドレス形式ミスバリデーションテスト", async () => {
            appRenderer(<MUISignIn />)
            const email = screen.getByRole("textbox", { name: "Email Address" })
            const button = screen.getByRole("button", { name: "Sign In" })
            fireEvent.input(email, { target: { value: "fuga" } })
            fireEvent.submit(button)
            await waitFor(() => {
                const helperText = screen.getAllByText("メールアドレスの形式が正しくありません").find((x) => x.id === "email-helper-text")
                expect(helperText).toBeInTheDocument()
            })
            expect(email).toHaveAttribute("aria-invalid", "true")
        }),
        test("パスワード入力欄テスト", () => {
            appRenderer(<MUISignIn />)
            const password = screen.getByLabelText("password", { exact: false })
            fireEvent.input(password, { target: { value: "test" } })
            expect(password).toHaveValue("test")
        }),
        test("パスワード空欄バリデーションテスト", async () => {
            appRenderer(<MUISignIn />)
            const password = screen.getByLabelText("password", { exact: false })
            const button = screen.getByRole("button", { name: "Sign In" })
            fireEvent.input(password, { target: { value: "" } })
            fireEvent.submit(button)
            await waitFor(() => {
                const helperText = screen.getAllByText("必須入力欄です").find((x) => x.id === "password-helper-text")
                expect(helperText).toBeInTheDocument()
            })
            expect(password).toHaveAttribute("aria-invalid", "true")
        }),
        test("パスワード文字数バリデーションテスト", async () => {
            appRenderer(<MUISignIn />)
            const password = screen.getByLabelText("password", { exact: false })
            const button = screen.getByRole("button", { name: "Sign In" })
            fireEvent.input(password, { target: { value: "abcd" } })
            fireEvent.submit(button)
            await waitFor(() => {
                const helperText = screen.getAllByText("パスワードは8文字以上です").find((x) => x.id === "password-helper-text")
                expect(helperText).toBeInTheDocument()
            })
            expect(password).toHaveAttribute("aria-invalid", "true")
        }),
        test("ログイン完了後、トップ画面に遷移テスト", async () => {
            //今回のテストで呼ばれるfetchは全て loginMock が代わりに動く
            global.fetch = jest.fn().mockImplementation(loginMock)
            appRenderer(<MUISignIn />)
            const email = screen.getByRole("textbox", { name: "Email Address" })
            const password = screen.getByLabelText("password", { exact: false })
            const button = screen.getByRole("button", { name: "Sign In" })
            

            fireEvent.input(email, { target: { value: "hoge@gmail.com" } })
            fireEvent.input(password, { target: { value: "abcdefgh" } })
            fireEvent.submit(button)
            await waitFor(()=>{
                expect(screen.getByText("Test Top")).toBeInTheDocument()
            })
            
            
        })
})