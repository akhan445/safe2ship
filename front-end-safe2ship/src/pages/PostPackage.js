import React, {useEffect, useState} from "react";
import axios from "axios";
import "../components/package.css";



export default function PostPackage(props) {

  const npkg_init = {
    customer_id : props.user[0].id,
    size :'',
    weight : null,
    description :'',
    source: '',
    destination: '',
    delivery_deadline : '',
    status : 'ready',
    price : '',
  }

  const [npkg, setNpkg] = useState({...npkg_init})

  const pricing = (input) => {  // demo logic. to be re-effected for production
    if (input === 'Small')  return 500;
    if (input === 'Medium')  return 1000;
    if (input === 'Large')  return 1500;
  }

  const pkginfo_handler = (key, value) => {
    setNpkg(prev => ({...prev, [key]: value}));
  }

  const npkgValidation = (input) => {
    if (input.customer_id !== props.user[0].id) return 'Stop messing with the system 1';
    if (input.size === '') return 'Oop! You missed selecting a size!';
    // if (input.weight === '') return 'Oop! You missed entering the weight!';
    if (input.description === '') return 'Oop! You missed entering the description!';
    if (input.source === '') return 'Oop! You missed entering the source!';
    if (input.destination === '') return 'Oop! You missed entering the destination!';
    if (input.delivery_deadline === '') return 'Oop! You missed entering the delivery_deadline!';
    if (input.price === '') return 'Stop messing with the system 2';
    if (input.status === '') return 'Stop messing with the system 3';
    return 'good!'
  }

  const updateUserState = (newpkg) => {
    props.setUser(prev => {
      const updating = {...prev};
      const pkgs = [...updating.packages];
      pkgs.push(newpkg);
      updating['packages'] = pkgs;
      return updating});
  }

  useEffect(() => {
    setNpkg(prev => ({...prev, ...npkg_init}));
  }, [])

  const npkgsubmitHandler = (input, event) => {
    event.preventDefault();
    input['price'] = pricing(input.size);
    if (npkgValidation(input) === 'good!') {
      props.hv_handler('pending') // switch to pending...

      axios.post('/api/pkgs/create', {...input})
        .then(pkginfo => {
          console.log('this feedb ===>', pkginfo.data) //--------------------------------------
          updateUserState(pkginfo.data[0]);
  
          if (props.user.status === 'customer')  props.hv_handler("customerHome");
          if (props.user.status === 'shipper') props.hv_handler("shipperHome");
        })
        .catch((error) => props.errorHandler('Oop! Something went wrong. Please Consider trying again shortly!'))
    } else {
      props.errorHandler(`Oops! Something is missing or missentered: ${npkgValidation(input)}. Please verify and make sure of the right information and resubmit. Thank you!`)
    }

  }

  return (
    <div className="container  my-5 py-4">


      
      <div className="text-center">
              <button type="button" onClick={() => props.hv_handler(props.user[0].status === 'shipper' ? 'shipperHome': 'customerHome')} className="btn btn-lg btn-primary"><i className="bi-lg bi-reply-all"></i></button>
      </div>

      <h2 className="text-center">Post New Package</h2>
      <form>
      <div className="row justify-content-center">
        
        <div className="col-sm-12 col-md-4 mb-3">
          <label htmlFor="source" className="form-label">Source</label>
          <input type="text" className="form-control" id="source" onChange={(e) => pkginfo_handler('source', e.target.value)} placeholder="123 Main Street, Toronto ON"></input>
        </div>
        <div className="col-sm-12 col-md-4 mb-3">
          <label htmlFor="destination" className="form-label">Destination</label>
          <input type="text" className="form-control" id="destination" onChange={(e) => pkginfo_handler('destination', e.target.value)} placeholder="123 Main Street, Toronto ON"></input>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mb-3">
          <select className="form-select" onClick={(e) => pkginfo_handler('delivery_deadline', e.target.value)} aria-label="Default select example">
            <option defaultValue >Choose delivery option...</option>
            <option value="1" >Same Day</option>
            <option value="2" >Next Day</option>
            <option value="3" >Within 7 days</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mb-3">
          <h5>Select Package Size</h5>
          <div className="form-check d-flex align-items-center">
            <input className="form-check-input" type="radio" value="Small" onChange={(e) => { if (e.target.checked) { pkginfo_handler('size', e.target.value)}}} name="flexRadioDefault" id="small"></input>
            <label className="form-check-label" htmlFor="small">
                <i className="bi bi-box box-size-small"></i>
                <span>
                  <strong>Small</strong> (1 - 15 lbs)
                </span>
            </label>
          </div>
          <div className="form-check d-flex align-items-center">
            <input className="form-check-input" type="radio" value="Medium" onChange={(e) => { if (e.target.checked) { pkginfo_handler('size', e.target.value)}}} name="flexRadioDefault" id="medium"></input>
            <label className="form-check-label" htmlFor="medium">
                <i className="bi bi-box box-size-medium"></i>
                <span>
                  <strong>Medium</strong> (16 - 30 lbs)
                </span>
            </label>
          </div>
          <div className="form-check d-flex align-items-center">
            <input className="form-check-input" type="radio" value="Large" onChange={(e) => { if (e.target.checked) { pkginfo_handler('size', e.target.value)}}} name="flexRadioDefault" id="large"></input>
            <label className="form-check-label" htmlFor="large">
                <i className="bi bi-box box-size-large"></i>
                <span>
                  <strong>Large</strong> (31 - 50 lbs)
                </span>
            </label>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" onChange={(e) => pkginfo_handler('description', e.target.value)} rows="2"></textarea>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="d-grid gap-2 col-6">
          <button className="btn btn-lg btn-primary" type="submit" onClick={(e) => npkgsubmitHandler(npkg, e)} >Get it Delivered</button>
        </div>
      </div>
        
      </form>
      
    </div>
  );
}

