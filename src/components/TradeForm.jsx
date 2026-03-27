import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import { calculateSummary } from "../utils/calculations";

const premiumOptions = ["ATM", "ITM", "OTM"];
const strategies = ["Scalping", "ORB", "Reversal", "Breakdown"];

const TradeForm = ({ addTrade, trades }) => {
  const summary = calculateSummary(trades);

  const locked = trades.length >= 3 || summary.isLossLimitHit;

  if (locked) {
    return (
      <div className="alert alert-danger text-center">
        🚫 Trading Locked (Rule Hit)
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        type: "PE",
        strike: "",
        premium: "ATM",
        entry: "",
        exit: "",
        strategy: "Scalping",
      }}
      onSubmit={(values, { resetForm }) => {
        addTrade({
          id: uuidv4(),
          ...values,
          pnl: values.exit - values.entry,
          date: new Date(),
        });

        resetForm();
      }}
    >
      <Form className="card p-3 mb-3">
        <h6>Add Trade</h6>

        <div className="row g-2">
          <div className="col-6">
            <Field as="select" name="type" className="form-control">
              <option value="PE">PE</option>
              <option value="CE">CE</option>
            </Field>
          </div>

          <div className="col-6">
            <Field as="select" name="premium" className="form-control">
              {premiumOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </Field>
          </div>

          <div className="col-12">
            <Field
              name="strike"
              placeholder="Strike"
              className="form-control"
            />
          </div>

          <div className="col-6">
            <Field name="entry" type="number" className="form-control" />
          </div>

          <div className="col-6">
            <Field name="exit" type="number" className="form-control" />
          </div>

          <div className="col-12">
            <Field as="select" name="strategy" className="form-control">
              {strategies.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Field>
          </div>

          <button className="btn btn-primary w-100 mt-2">Add Trade</button>
        </div>
      </Form>
    </Formik>
  );
};

export default TradeForm;
