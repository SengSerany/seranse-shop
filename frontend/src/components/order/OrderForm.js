import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createNewOrders } from '../../features/order/orderSlice';
import { toast } from 'react-toastify';

const newAdressButtonStyle = {
  '--btn-width': '100%',
  margin: 'auto 0.1rem',
};

const submitButtonStyle = {
  '--pad-top_down': '12px',
  '--pad-left_right': '30px',
  '--cta_margin_custom': 'auto',
  '--clr-cta_shadow_custom': 'var(--clr-strong_blue)',
};

const initialAdress = {
  adressName: '',
  street: '',
  zipCode: '',
  city: '',
};

function OrderForm({ totalOrder = 0, productsOrder = [] }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { adresses } = useSelector((state) => state.order);
  const [adressType, setAdressType] = useState('unselected');
  const [formData, setFormData] = useState({
    user: user.id,
    clientName: '',
    adress: initialAdress,
    products: productsOrder,
    total: totalOrder,
  });

  const log = (e) => {
    e.preventDefault();
    console.log(location.pathname);
  };

  const handleChangeAdressType = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'registeredAdress') {
      if (value === 'select') {
        setAdressType('unselected');
        if (formData.adress.adressName !== '') {
          setFormData({ ...formData, adress: initialAdress });
        }
      } else {
        setAdressType('registeredAdress');
        const currentAdress = adresses.find(
          (adress) => adress.adressName === value
        );
        setFormData({
          ...formData,
          adress: currentAdress,
        });
      }
    } else if (name === 'newAdress') {
      setAdressType('newAdress');
      if (document.querySelector('select').options.selectedIndex !== 0) {
        document.querySelector('select').options.selectedIndex = 0;
        setFormData({ ...formData, adress: initialAdress });
      }
    }
  };

  const handleChangeClientName = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, clientName: value });
  };

  const handleChangeNewAdressInfos = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, adress: { ...formData.adress, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adressType === 'unselected') {
      toast.error(
        'Veuillez choisir une adresse déja enregistrer ou ajouter une nouvelle adresse'
      );
    }
    dispatch(createNewOrders(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={log}>Log</button>
      <div className="order-form">
        <section className="order-form_adress">
          <h2 className="uppercase ff-primary fs-600 text-center">
            Adresse de livraison
          </h2>
          <div className="order-form_adress_inputs">
            <div className="form-fields">
              <select
                className="ff-sans_cond fs-300 fw-semi_bold"
                name="registeredAdress"
                onChange={handleChangeAdressType}
              >
                <option value="select">Choisir une adresse</option>
                {adresses &&
                  adresses.map((adress) => (
                    <option key={adress._id} value={adress.adressName}>
                      {adress.adressName}
                    </option>
                  ))}
              </select>
            </div>
            <p> OU </p>
            <div className="form-fields">
              <button
                className="button-type bg-strong_blue text-white uppercase ff-sans_cond fs-200 letter-spacing-3 text-center"
                style={newAdressButtonStyle}
                name="newAdress"
                onClick={handleChangeAdressType}
              >
                Ajouter une nouvelle adresse
              </button>{' '}
            </div>
            {adressType === 'registeredAdress' && (
              <div className="order-form-registered-adress form-fields">
                <h5 className="uppercase ff-sans_cond fs-400 letter-spacing-3 fw-semi_bold">
                  Adresse selectionné:
                </h5>
                <div className="form-fields">
                  <input
                    type="text"
                    value={formData.clientName}
                    placeholder="Entrer le nom du destinataire ici"
                    onChange={handleChangeClientName}
                    required
                  />
                </div>
                <p>
                  {formData.adress.street}
                  <br />
                  {formData.adress.zipCode} {formData.adress.city}
                </p>
              </div>
            )}
            {adressType === 'newAdress' && (
              <div className="order-form-new-adress form-fields">
                <h5 className="uppercase ff-sans_cond fs-400 letter-spacing-3 fw-semi_bold">
                  Nouvelle adresse
                </h5>
                <div className="order-adress-form form-fields">
                  <label htmlFor="adressName">Intitulé de l'adresse</label>
                  <input
                    type="text"
                    name="adressName"
                    value={formData.adress.adressName}
                    onChange={handleChangeNewAdressInfos}
                    required
                  />
                  <label htmlFor="clientName">Nom du destinataire</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={handleChangeClientName}
                    required
                  />
                  <label htmlFor="street">Rue</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.adress.street}
                    onChange={handleChangeNewAdressInfos}
                    required
                  />
                  <div className="flex">
                    <div className="order-form-end_adress order-form-zipcode">
                      <label htmlFor="zipCode">Code postal</label>
                      <input
                        type="number"
                        min={0}
                        name="zipCode"
                        value={formData.adress.zipCode}
                        onChange={handleChangeNewAdressInfos}
                        required
                      />
                    </div>
                    <div className="order-form-end_adress order-form-city">
                      <label htmlFor="city" className="text-center">
                        Ville
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.adress.city}
                        onChange={handleChangeNewAdressInfos}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* <section className="order-form_payement">
          <h2 className="uppercase ff-primary fs-600 text-center">Payement</h2>
          <div className="form-fields">
            <input
              type="text"
              //   name="payment"
              // value={formData.payment}
              // onChange={handleChange}
            />
          </div>
          <div className="form-fields">
            <input
              type="text"
              //   name="payment"
              // value={formData.payment}
              // onChange={handleChange}
            />
          </div>
          <div className="form-fields">
            <input
              type="text"
              //   name="payment"
              // value={formData.payment}
              // onChange={handleChange}
            />
          </div>
        </section> */}
        <button
          type="submit"
          className="flex cta cta-small ff-primary fs-400 text-white bg-red uppercase text-center"
          style={submitButtonStyle}
        >
          Commander
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <br />
      </div>
    </form>
  );
}

export default OrderForm;
