use anchor_lang::prelude::*;

declare_id!("DhidfBsE892jsmRzGiQsUBm7QvJN4m9PnC5mJNSAX2EV");

#[program]
pub mod calculator {
    use super::*;
    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greetings = init_message;
        Ok(())
    }
    pub fn add(ctx: Context<Addition>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 + num2;
        Ok(())
    }
    pub fn substraction(ctx: Context<Subtraction>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 - num2;
        Ok(())
    }
    pub fn multiply(ctx: Context<Multiplication>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 * num2;
        Ok(())
    }
    pub fn divide(ctx: Context<Division>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        // if (num2 != 0) {
        calculator.result = num1 / num2;
        calculator.remainder = num1 % num2;
        // }
        Ok(())
    }
}

#[account]
pub struct Calculator {
    pub greetings: String,
    pub result: i64,
    pub remainder: i64,
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer= user, space=8+64+64+64+64)]
    pub calculator: Account<'info, Calculator>,
    pub user: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}
#[derive(Accounts)]
pub struct Subtraction<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Multiplication<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Division<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}
