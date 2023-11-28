import styles from "./mortgageCalculator.module.css";
import { useState } from 'react';


function MortgageCalculator() {

    const [homePrice, setHomePrice] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [loanTime, setLoanTime] = useState(0);
    const [interestRate, setInterestRate] = useState(0.00);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    function calcMortgage(event) {
        event.preventDefault();
        let principal = homePrice - downPayment;
        let monthlyInterest = interestRate / 1200;
        let months = loanTime * 12;
        let monthlyPayment = principal * monthlyInterest / (1 - (Math.pow(1/(1 + monthlyInterest), months)));
        setMonthlyPayment(monthlyPayment);
        
    }

    //Change variables when the form input fields are changed
    function changeHomePrice(event) {
        setHomePrice(event.target.value);
    }
    function changeDownPayment(event) {
        setDownPayment(event.target.value);
    }
    function changeLoanTime(event) {
        setLoanTime(event.target.value);
    }
    function changeInterestRate(event) {
        setInterestRate(event.target.value);
    }


    return(
    <div>
        <form onSubmit={calcMortgage}>
            <label htmlFor='homePrice'>Home Price</label>
            <input name="homePrice" id='homePrice' type="number" onChange={changeHomePrice}></input>
            <label htmlFor='downPayment'>Down Payment</label>
            <input name="downPayment" id='downPayment' type="number" onChange={changeDownPayment}></input>
            <label htmlFor='loanTime'>Loan Term</label>
            <input name="loanTime" id='loanTime' type="number" onChange={changeLoanTime}></input>
            <label htmlFor='interestRate'>Interest Rate</label>
            <input name="interestRate" id='interestRate' onChange={changeInterestRate}></input>
            <button type="submit">Calculate</button>

            <p>${monthlyPayment.toFixed(2)}</p>
        </form>
    </div>
    );
}

export default MortgageCalculator;