import getExpensesTotal from "../../selectors/expenses-total";
import testExpenses from "../fixtures/expenses";

test("should return total amount for 3 expenses from fixtures", ()=>{
    expect(getExpensesTotal(testExpenses)).toBe(114195);
});

test("should return total amount 0 to empty array (no expenses)", ()=>{
    const noExpenses = [];
    expect(getExpensesTotal(noExpenses)).toBe(0);
});
test("should return total amount when only first element in expenses array",()=>{
    const shortExpenses = [testExpenses[0]];
    expect(getExpensesTotal(shortExpenses)).toBe(195);
});
test("should return total amount when only first element and third in expenses array",()=>{
    const shortExpenses = [testExpenses[0], testExpenses[2]];
    //console.log(shortExpenses);
    expect(getExpensesTotal(shortExpenses)).toBe(4695);
});