import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import { executionEngine } from "../core/executionEngine";

const premiumOptions = ["ATM", "ITM", "OTM"];
const strategies = ["Scalping", "ORB", "Reversal", "Breakdown"];

const TradeForm = ({ addTrade, session }) => {
  return (
    <Formik
      initialValues={{
        type: "PE",
        strike: "",
        premium: "ATM",
        entry: "",
        exit: "",
        sl: "",
        qty: 1,
        strategy: "Scalping",
      }}
      onSubmit={(values, { resetForm }) => {
        const tradeData = {
          ...values,
          id: uuidv4(),
          entry: Number(values.entry),
          exit: Number(values.exit),
          sl: Number(values.sl),
          qty: Number(values.qty),
          date: new Date(),
        };

        const result = executionEngine(tradeData, session);

        if (!result.allowed) {
          alert(`🚫 You’re DONE for the day. Walk away.: ${result.reason}`);
          return;
        }

        addTrade(result.trade);
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

          <div className="col-6">
            <Field
              name="sl"
              type="number"
              placeholder="Stop Loss"
              className="form-control"
            />
          </div>

          <div className="col-6">
            <Field
              name="qty"
              type="number"
              placeholder="Qty"
              className="form-control"
            />
          </div>

          <div className="col-12">
            <Field as="select" name="strategy" className="form-control">
              {strategies.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Field>
          </div>

          <button className="btn btn-primary w-100 mt-2">Execute Trade</button>
        </div>
      </Form>
    </Formik>
  );
};

export default TradeForm;
