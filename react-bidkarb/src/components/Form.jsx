import React from "react";

function Form(props) {
  return (
    <>
    {console.log(props)}
    <form onSubmit={props.onSubmit}>
      <label>
        Item Name:
        <input
          type="text"
          name="productName"
          value={props.value.productName}
          onChange={props.onChange}
          placeholder="{item name}"
        ></input>
      </label>
      <label>
        Category:
        <input
          type="text"
          name="productCategory"
          value={props.value.productCategory.CategoryName}
          onChange={props.onChange}
          placeholder="category name"
        ></input>
      </label>
      <label>
        Quality:
        <select name="quality" value={props.value.quality} onChange={props.onChange}>
          <option value="new">new</option>
          <option value="second hand">second hand</option>
        </select>
      </label>
      <label>
        Start bid:
        <input
          type="text"
          name="openPrice"
          value={props.value.openPrice}
          onChange={props.onChange}
          placeholder="start bid price"
        ></input>
      </label>
      <label>
        Minimum bid:
        <input
          type="text"
          name="minBid"
          value={props.value.minBid}
          onChange={props.onChange}
          placeholder="minimun bid price"
        ></input>
      </label>
      <label>
        Buy now:
        <input
          type="text"
          name="buyNow"
          value={props.value.buyNow}
          onChange={props.onChange}
          placeholder="buy now price"
        ></input>
      </label>
      <label>
        Start Time:
        <input
          type="datetime-local"
          name="startAt"
          value={props.value.startAt}
          onChange={props.onChange}
          placeholder="start time"
        ></input>
      </label>
      <label>
        End Time:
        <input
          type="datetime-local"
          name="endAt"
          value={props.value.endAt}
          onChange={props.onChange}
          placeholder="end time"
        ></input>
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={props.value.description}
          onChange={props.onChange}
          placeholder="description"
        ></input>
      </label>
      <label>
        Bank name
        <input
          type="text"
          name="bankName"
          value={props.value.bankName}
          onChange={props.onChange}
          placeholder="bank name"
        ></input>
      </label>
      <label>
        Bank account
        <input
          type="text"
          name="bankNumber"
          value={props.value.bankNumber}
          onChange={props.onChange}
          placeholder="Bank account id"
        ></input>
      </label>
      <button type="submit">Confirm</button>
    </form>
    </>
  );
}

export default Form;
