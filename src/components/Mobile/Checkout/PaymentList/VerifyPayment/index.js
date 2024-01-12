import React, { Component } from "react";
import { PAYU_PROCESS_VERIFY_URL } from "../../../../../configs";
import Axios from "axios";

class VerifyPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: true,
      error: "",
    };
  }

  componentDidMount() {
    const { transaction_id } = this.props.match.params;

    if (transaction_id) {
      Axios.post(PAYU_PROCESS_VERIFY_URL, {
        unique_order_id: transaction_id,
      })
        .then((response) => {
          const { key, hash } = response.data;
          const data = {
            key,
            hash,
            command: "verify_payment",
            var1: transaction_id,
          };

          Axios.post("https://secure.payu.in/merchant/postservice?form=2", data)
            .then((response) => {
              const { status } = response.data.transaction_details[transaction_id];

              if (status === "success") {
                this.props.history.push("/running-order/" + transaction_id);
              } else {
                this.props.history.push("/my-orders");
              }
            })
            .catch((error) => {
              this.setState({ verifying: false, error: error.message });
            });
        })
        .catch((error) => {
          this.setState({ verifying: false, error: error.message });
        });
    } else {
      this.setState({ verifying: false, error: "Transaction ID not found in URL parameter." });
    }
  }

  render() {
    const { verifying, error } = this.state;

    return (
      <div className="verify-payment-container">
        <h2 className="verify-payment-heading">Verifying Payment</h2>
        {verifying ? (
          <div className="verify-payment-message">Please Wait...</div>
        ) : (
          <div className="verify-payment-message">{error}</div>
        )}
      </div>
    );
  }
}

export default VerifyPayment;
