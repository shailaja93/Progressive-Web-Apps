# pwa
import React,{Component} from 'react'

class Pagesrender extends Component{

  render() {
    // let listofpages = this.props.data.map((pages) => {
    // return ( 
    //     <div className="col-xs-3" key={pages.name}>
    //         <img src={pages.picture.data.url} alt="fb-1" className="img-responsive center-block" />
    //         <p className="font-14">{pages.name}</p>
	  //   	</div>
    //      )
    // })
    return (<div className="col-lg-6 col-md-7 col-sm-10 col-xs-12 no-float in-block">
            {this.props.data.map((pages) => 
               <div className="col-xs-3" key={pages.name}>
                <img src={pages.picture.data.url} alt="fb-1" className="img-responsive center-block" />
                <p className="font-14">{pages.name}</p>
	            	</div> 
            )}</div>)
  }
};

export default Pagesrender

import React,{Component} from 'react'
import validator from 'validator'
import { browserHistory } from 'react-router'

class Contactdesc extends Component{

    constructor() {
      super();
      this.state = {phone_invalid: false,email_invalid: false,name : '',email: '',phone : '',phone_error_message : '',email_error_message : '',name_error_message : ''};

      this.handleChange_name = this.handleChange_name.bind(this);
      this.handleChange_email = this.handleChange_email.bind(this);
      this.handleChange_phone = this.handleChange_phone.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
    } 

    handleChange_name(event) {
      this.setState({name: event.target.value});
      if(event.target.value.length === 0)
      {
        this.setState({name_invalid : true});
        this.setState({name_error_message : 'This field is required'});
      }
      else
      {
        this.setState({name_invalid : false});
        this.setState({name_error_message : ''});
      }
    }

    handleChange_email(event) {
      this.setState({email: event.target.value});
      if(!validator.isEmail(event.target.value))
      {
        this.setState({email_invalid : true});
        this.setState({email_error_message : 'Please enter a valid email address'});
      }
      else
      {
        this.setState({email_invalid : false});
        this.setState({email_error_message : ''});
      }
    }

    handleChange_phone(event) {
      this.setState({phone: event.target.value});
      if(!validator.isNumeric(event.target.value))
      {
        this.setState({phone_invalid : true});
        this.setState({phone_error_message : "Invalid Format"});
      }
      else if(event.target.value.length !== 10)
      {
        this.setState({phone_invalid : true});
        this.setState({phone_error_message : "Please enter at least 10 characters"});
      }
      else
      {
        this.setState({phone_invalid : false});
        this.setState({phone_error_message : ''});
      }
    }

    handleSubmit(event) {
        event.preventDefault();
    
        if(this.state.name.length === 0 && this.state.email.length === 0 && this.state.phone.length === 0)
        {
          this.setState({name_invalid : true,email_invalid : true,phone_invalid : true});
          this.setState({name_error_message : 'This field is required',email_error_message : 'This field is required',phone_error_message : 'This field is required'});
        }
        else if(this.state.name.length === 0)
        {
          this.setState({name_invalid : true});
          this.setState({name_error_message : 'This field is required'});
        }
        else if(this.state.email.length === 0)
        {
          this.setState({email_invalid : true});
          this.setState({email_error_message : 'This field is required'});
        }
        else if(this.state.phone.length === 0)
        {
          this.setState({phone_invalid : true});
          this.setState({phone_error_message : 'This field is required'});
        }
        else if(!validator.isNumeric(this.state.phone))
        {
          this.setState({phone_invalid : true});
          this.setState({phone_error_message : 'Invalid Format'});
        }
        else if(this.state.phone.length !== 10)
        {
          this.setState({phone_invalid : true});
          this.setState({phone_error_message : 'Please enter at least 10 characters'});
        }
        else
        {
          this.setState({name_invalid : false,email_invalid : false,phone_invalid : false});
          this.setState({name_error_message : '',email_error_message : '',phone_error_message : ''});
          browserHistory.push('/thankyou');
        }
     }

    render () {
        return (
            <div className="contact-us padding-top-60">
              <div className="container padding-top-40">
                <div className="row">
                  <div className="col-sm-12">
                    <h1 className="main-block-ttl"><span>Get In Touch!</span></h1>
                    <form method="post" id="contactus-form" className="detail-form" onSubmit={this.handleSubmit}>
                      <div className="weight-700 text-center padding-top-20 text-dark-blue font-20">Your Details</div>
                      <div className="padding-top-40" />
                      <div className="row">
                        <div className="col-sm-4">
                          <input type="text" placeholder="Name" className="form-control inputclass" name="sender" id="name" value={this.state.name} onChange={this.handleChange_name} />
                          {this.state.name_invalid === true ? <label className="error" style={{display: 'inline-block'}}>{this.state.name_error_message}</label> : null}
                        </div>
                        <div className="col-sm-4">
                          <input type="text" placeholder="Email" className="form-control inputclass" name="senderEmail" id="email" value={this.state.email} onChange={this.handleChange_email} />
                          {this.state.email_invalid === true ? <label className="error" style={{display: 'inline-block'}}>{this.state.email_error_message}</label> : null}
                        </div>
                        <div className="col-sm-4">
                          <input type="text" maxLength={10} placeholder="Phone Number" className="form-control inputclass" name="contact" id="phone" value={this.state.phone} onChange={this.handleChange_phone} />
                          {this.state.phone_invalid === true ? <label className="error" style={{display: 'inline-block'}}>{this.state.phone_error_message}</label> : null}
                        </div>
                      </div>        
                      <div className="clearfix" />
                      <div className="weight-700 text-center padding-top-20 text-dark-blue font-20">Type of Project</div>
                      <div className="padding-top-20" />
                      <div className="formradio text-center">
                        <div className="custom-radio">
                          <input type="radio" defaultChecked defaultValue="Mobile" className="radio" id="radio1" name="radio" />
                          <label htmlFor="radio1">Mobile</label>
                        </div>
                        <div className="custom-radio">
                          <input type="radio" className="radio" defaultValue="Web" id="radio2" name="radio" />
                          <label htmlFor="radio2">Web</label>
                        </div>
                        <div className="custom-radio">
                          <input type="radio" className="radio" defaultValue="Other" id="radio3" name="radio" />
                          <label htmlFor="radio3">Other</label>
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="padding-top-40" />
                      <div className="weight-700 text-center padding-top-20 text-dark-blue font-20">Brief Description</div>
                      <div className="padding-top-20" />
                      <div className="typeofdiv text-center">
                        <div className="col-sm-8 no-float in-block">
                          <textarea id="comment" rows={6} name="message" className="textareastyle form-control" defaultValue={""} />
                          <div className="text-center padding-top-40">
                            <input type="submit" className="btn btn-custom-1" id="submit-form" defaultValue="Send" name="submit" />
                          </div>    
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="container padding-top-bottom">
                <div className="row text-center">
                  <div className="col-sm-4">
                    <div className="circle center-block margin-bottom-20">
                      <svg height="50px" width="50px" style={{enableBackground: 'new 0 0 14 14'}} viewBox="0 0 14 14" y="0px" x="0px" id="Capa_1" version="1.1" xlinkHref="https://www.w3.org/1999/xlink" xmlns="https://www.w3.org/2000/svg">
                        <g>
                          <path fill="#58585b" d="M7,9L5.268,7.484l-4.952,4.245C0.496,11.896,0.739,12,1.007,12h11.986    c0.267,0,0.509-0.104,0.688-0.271L8.732,7.484L7,9z" />
                          <path fill="#58585b" d="M13.684,2.271C13.504,2.103,13.262,2,12.993,2H1.007C0.74,2,0.498,2.104,0.318,2.273L7,8    L13.684,2.271z" />
                          <polygon fill="#58585b" points="0,2.878 0,11.186 4.833,7.079   " />
                          <polygon fill="#58585b" points="9.167,7.079 14,11.186 14,2.875   " />
                        </g>
                      </svg>
                    </div>
                    <span className="font-20 weight-700 contact-blue">Email</span>
                    <p className="font-20 weight-400"><a href="mailto:contactus@solutelabs.com">contactus@solutelabs.com</a></p>
                  </div>
                  <div className="col-sm-4">
                    <div className="circle center-block margin-bottom-20">
                      <svg style={{enableBackground: 'new 0 0 35 35'}} viewBox="0 0 35 35" height="50px" width="50px" y="0px" x="0px" id="Capa_1" version="1.1" xlinkHref="https://www.w3.org/1999/xlink" xmlns="https://www.w3.org/2000/svg">
                        <g>
                          <path fill="#58585b" d="M25.302,0H9.698c-1.3,0-2.364,1.063-2.364,2.364v30.271C7.334,33.936,8.398,35,9.698,35h15.604   c1.3,0,2.364-1.062,2.364-2.364V2.364C27.666,1.063,26.602,0,25.302,0z M15.004,1.704h4.992c0.158,0,0.286,0.128,0.286,0.287   c0,0.158-0.128,0.286-0.286,0.286h-4.992c-0.158,0-0.286-0.128-0.286-0.286C14.718,1.832,14.846,1.704,15.004,1.704z M17.5,33.818   c-0.653,0-1.182-0.529-1.182-1.183s0.529-1.182,1.182-1.182s1.182,0.528,1.182,1.182S18.153,33.818,17.5,33.818z M26.021,30.625   H8.979V3.749h17.042V30.625z" />
                        </g>
                      </svg>
                    </div>
                    <span className="font-20 weight-700 contact-blue">Phone</span>
                    <p className="font-20 weight-400"><a href="tel:+9107966172582">+91 (079) 66172582</a></p>
                  </div>
                  <div className="col-sm-4">
                    <div className="circle center-block margin-bottom-20">
                      <svg style={{enableBackground: 'new 0 0 466.583 466.582'}} viewBox="0 0 466.583 466.582" height="50px" width="50px" y="0px" x="0px" id="Capa_1" version="1.1" xlinkHref="https://www.w3.org/1999/xlink" xmlns="https://www.w3.org/2000/svg">
                        <g>
                          <path fill="#58585b" d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" />
                        </g>
                      </svg>
                    </div>
                    <span className="font-20 weight-700 contact-blue">Find Us</span>
                    <a target="_blank" href="https://www.google.co.in/maps/place/Solute+TechnoLabs+LLP/@22.999227,72.501224,15z/data=!4m2!3m1!1s0x0:0x39ace72a29b1e5cd?sa=X&ved=0ahUKEwj5pprQ8KLRAhVHuo8KHVQxDt8Q_BIIZzAK"><p className="font-20 weight-400">A1-104, Palladium, <br />Corporate Road, <br />Behind Divya Bhaskar, <br />Prahlad Nagar, Ahmedabad, <br />Gujarat 380015.</p></a>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Contactdesc;

