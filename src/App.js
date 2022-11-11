import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from "./context/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const { budgets, getBudgetExpenses } = useBudgets()
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(306px, 1fr))', gap: "1rem", alignItems: "flex-start"}}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expenses) => total + expenses, 0)
            return (
              <BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} gray/>
            )
          })}
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
    </>
  )
}

export default App;
