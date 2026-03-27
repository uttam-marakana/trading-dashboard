import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";
import { executionEngine } from "../core/executionEngine";
import PreTradeInsights from "./PreTradeInsights";

const premiumOptions = ["ATM", "ITM", "OTM"];
const strategies = ["Scalping", "ORB", "Reversal", "Breakdown"];
const mistakes = ["None", "Late Entry", "FOMO", "No SL", "Overtrade"];

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
        mistake: "None",
        confidence: 3,
      }}
      validate={(values) => {
        const errors = {};

        if (!values.entry) errors.entry = "Required";
        if (!values.exit) errors.exit = "Required";
        if (!values.sl) errors.sl = "Required";

        if (Number(values.entry) <= 0) errors.entry = "Invalid entry";
        if (Number(values.exit) <= 0) errors.exit = "Invalid exit";
        if (Number(values.qty) <= 0) errors.qty = "Invalid qty";

        if (Number(values.confidence) < 1 || Number(values.confidence) > 5) {
          errors.confidence = "1–5 only";
        }

        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        const tradeData = {
          ...values,
          id: uuidv4(),
          entry: Number(values.entry),
          exit: Number(values.exit),
          sl: Number(values.sl),
          qty: Number(values.qty),
          confidence: Number(values.confidence),
          date: new Date(),
        };

        const result = executionEngine(tradeData, session);

        if (!result.allowed) {
          alert(`🚫 ${result.reason}`);
          return;
        }

        addTrade(result.trade);
        resetForm();
      }}
    >
      {({ values }) => (
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
              <Field
                name="entry"
                placeholder="Entry"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="entry"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-6">
              <Field
                name="exit"
                placeholder="Exit"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="exit"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-6">
              <Field name="sl" type="number" className="form-control" />
              <ErrorMessage
                name="sl"
                placeholder="Stop Loss"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-6">
              <Field
                name="qty"
                
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="qty"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-6">
              <Field as="select" name="strategy" className="form-control">
                {strategies.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Field>
            </div>

            <div className="col-6">
              <Field as="select" name="mistake" className="form-control">
                {mistakes.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </Field>
            </div>

            <div className="col-12">
              <Field name="confidence" type="number" className="form-control" />
              <ErrorMessage
                name="confidence"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* 🔥 PRE-TRADE INTELLIGENCE */}
            <PreTradeInsights values={values} />

            <button className="btn btn-primary w-100 mt-2">
              Execute Trade
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TradeForm;
