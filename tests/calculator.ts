import * as anchor from '@project-serum/anchor';
import assert from "assert";
import { Program } from '@project-serum/anchor';
import { SystemProgram } from '@solana/web3.js';
import { Calculator } from '../target/types/calculator';

describe('calculator', () => {
  const provider = anchor.Provider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);
  const calculator =  anchor.web3.Keypair.generate();

  const program = anchor.workspace.Calculator as Program<Calculator>;
  var _calculator = null;
  it('Is initialized!', async () => {
    // Add your test here.
    await program.rpc.create("Welcome to Solana Calculator", {
      accounts : {
      calculator: calculator.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [calculator]
    },
    );
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greetings === "Welcome to Solana Calculator");
    _calculator = calculator;
  })
    
   it('Add two number', async () => {
    const calculator = _calculator;
    await program.rpc.add( new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    console.log(account, new anchor.BN(5));
    assert.ok(account.result.toString() === new anchor.BN(5).toString());
    // assert.ok(account.greetings === "Welcome to Solana Calculator");
  });
   it('Subtract two number', async () => {
    const calculator = _calculator;
    await program.rpc.substraction( new anchor.BN(5), new anchor.BN(6), {
      accounts: {
        calculator: calculator.publicKey
      },
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    console.log(account);
    assert.ok(account.result === new anchor.BN(-1));
    // assert.ok(account.greetings === "Welcome to Solana Calculator");
  });
   it('Multiply two number', async () => {
    const calculator = _calculator;
    await program.rpc.multiply( new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    console.log(account);
    assert.ok(account.result === new anchor.BN(6));
    // assert.ok(account.greetings === "Welcome to Solana Calculator");
  });
   it('Divide two number', async () => {
   const calculator = _calculator;
    await program.rpc.divide( new anchor.BN(4), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    console.log(account);
    assert.ok(account.result === new anchor.BN(2));
    assert.ok(account.remainder.eq(new anchor.BN(0)));
    // assert.ok(account.greetings === "Welcome to Solana Calculator");
  });
});
