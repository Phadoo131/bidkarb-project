import Title from "../common/Title";
import Layout from "../layout/Layout";
import NavBar from "../common/NavBar";

import ItemImage from "../common/ItemImage";
import ReceiveForm from "../layout/ReceiveForm";
import RatingDesc from "../Layout/RatingDesc";
import Layout3 from "../layout/Layout3";


function ReceiveConfirm() {
  return (
    <>
      <Title title={"Receive Details"}>
        {/* <Layout
          image={<ItemImage />}
          detail={<ReceiveDetails />}
          desc={<RatingDesc />}
        /> */}
        <Layout3 form={<ReceiveForm />}/>
      </Title>
    </>
  );
}

export default ReceiveConfirm;