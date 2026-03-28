import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";
import PreTradeInsights from "./PreTradeInsights";
import BehaviorWarnings from "./BehaviorWarnings";

const premiumOptions = ["ATM", "ITM", "OTM"];
const strategies = ["Scalping", "ORB", "Reversal", "Breakdown"];
const mistakes = ["None", "Late Entry", "FOMO", "No SL", "Overtrade"];

const TradeForm = ({ addTrade, session }) => {
  const [warnings, setWarnings] = useState([]);

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

        const entry = Number(values.entry);
        const exit = Number(values.exit);
        const sl = Number(values.sl);

        if (!entry) errors.entry = "Required";
        if (!exit) errors.exit = "Required";
        if (!sl) errors.sl = "Required";

        if (entry <= 0) errors.entry = "Invalid entry";
        if (exit <= 0) errors.exit = "Invalid exit";
        if (Number(values.qty) <= 0) errors.qty = "Invalid qty";

        // 🔥 LOGIC VALIDATION
        if (entry && sl && entry === sl) {
          errors.sl = "SL cannot equal entry";
        }

        if (values.type === "CE" && sl >= entry) {
          errors.sl = "SL must be below entry (CE)";
        }

        if (values.type === "PE" && sl <= entry) {
          errors.sl = "SL must be above entry (PE)";
        }

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

        // 🚀 Only pass to App (single authority)
        const result = addTrade(tradeData);

        // Handle warnings if returned
        if (result?.warnings) {
          setWarnings(result.warnings);
        }

        if (result?.allowed) {
          resetForm();
        }
      }}
    >
      {({ values }) => (
        <Form className={`card ${session.isLocked ? "blocked" : ""}`}>
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
                type="number"
                placeholder="Entry"
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
                type="number"
                placeholder="Exit"
                className="form-control"
              />
              <ErrorMessage
                name="exit"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-6">
              <Field
                name="sl"
                type="number"
                placeholder="SL"
                className="form-control"
              />
              <ErrorMessage
                name="sl"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-6">
              <Field
                name="qty"
                type="number"
                placeholder="Qty"
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

            <PreTradeInsights values={values} />
            <BehaviorWarnings warnings={warnings} />

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={session.isLocked}
            >
              {session.isLocked ? "Session Locked" : "Execute Trade"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TradeForm;
