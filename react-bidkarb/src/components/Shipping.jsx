import React, { useState } from 'react';

function Shipping({auction, user}){
    const [shipping, setShipping] = useState({
        trackingNumber: "",
        shippingCompany: "",
        otherShippingCompany: "",
    });

    const {trackingNumber, shippingCompany, otherShippingCompany} = shipping;

    const handleInputChange = (e) => {
        setDispute({ ...dispute, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/shipping/comfirm-shipping", shipping )
    };

    return (
        <div>
        <h2>Shipment</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <input
                    type="text"
                    id="trackingNumber"
                    name="trackingNumber"
                    value={shipping.trackingNumber}
                    onChange={handleInputChange}
                    placeholder='Tracking number...'
                />
            </div>
            <div>
                <select name="shippingCompany" id="shipCom" onChange={handleInputChange}>
                    <option value="Thaipost">Thaipost</option>
                    <option value="Kerry">Kerry</option>
                    <option value="Flash">Flash</option>
                    <option value="Best">Best</option>
                    <option value="Ninja van">Ninja van</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <input
                    type='text'
                    id="otherShippingCompany"
                    name="otherShippingCompany"
                    value={shipping.otherShippingCompany}
                    onChange={handleInputChange}
                    placeholder='If you sent by other company please input shipping company name or remark message that you want to customer'
                />
            </div>
            <button type="submit">Comfirm Shipment</button>
        </form>
        </div>
    );
};

export default Shipping;