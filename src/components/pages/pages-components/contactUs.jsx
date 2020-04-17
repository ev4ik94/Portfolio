import React, {Component} from 'react';
import {ListGroup} from "react-bootstrap";
import {FormattedHTMLMessage}from "react-intl";

export default function Contact({classN, colorIcon, element}){
    
	return(
		<ListGroup as='ul' className={classN}>
            {element==='header'&&(<ListGroup.Item as='li' className="d-flex">
                <div className="icon-contacts mr-2">
                    <svg width="31px" height="30px" viewBox="0 0 31 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Главная" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Главная-нажатие-на-связь" transform="translate(-117.000000, -154.000000)">
                                <g id="Связаться" transform="translate(100.000000, 125.000000)">
                                    <g id="ЦБ" transform="translate(17.000000, 20.000000)">
                                        <image id="logo" x="0" y="9" width="30.3370787" height="30" xlinkHref="data:image/png;base64,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"></image>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="text-contsct-us">
                    <p className="mb-0 text-nowrap text-left">
                        <FormattedHTMLMessage id="header.Cb-bank-title" />
                    </p>
                    <p className="mb-0 text-nowrap text-left">
                        <FormattedHTMLMessage id="header.Cb-bank-phone" />
                    </p>
                </div>
            </ListGroup.Item>)}
            <ListGroup.Item as='li'  className="d-flex">
                <div className="icon-contacts  mr-2">     	
                    <svg width="35px" height="35px" viewBox="0 0 35 35" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Menu/Navigation" transform="translate(-1088.000000, -77.000000)" fill={colorIcon}>
                                <g id="Group" transform="translate(1088.000000, 70.000000)">
                                    <path d="M28.1302053,42 C26.673972,42 24.9151907,41.6350606 22.9810021,40.9051817 C18.7406203,39.3065114 14.1270566,36.1468421 9.99027102,32.0100769 C5.85230821,27.8721345 2.69262338,23.2574163 1.09276805,19.0170553 C-0.361110771,15.1616466 -0.364642461,11.9972685 1.08452745,10.5492829 C1.29289712,10.3409142 1.50479849,10.1172417 1.72376324,9.88650577 C3.04579232,8.4962042 4.53969696,6.93167346 6.51979752,7.00230691 C7.88420688,7.05881366 9.20623596,7.90641496 10.5600503,9.59102254 C14.5602772,14.5659713 12.7567611,16.3388707 10.6695326,18.3943038 L10.3010597,18.7592433 C9.95966305,19.1006382 9.31454111,20.6816501 15.3160587,26.6831382 C17.2749691,28.642039 18.9454582,30.0758978 20.2804369,30.9435119 C21.120979,31.4897439 22.6243014,32.3161552 23.2411699,31.6992898 L23.6119972,31.3249325 C25.6650861,29.2424232 27.4379942,27.4448021 32.4094357,31.4414777 C34.0940516,32.7952853 34.9404798,34.1161307 34.9969868,35.4828878 C35.0782157,37.4618014 33.501905,38.9592303 32.1104193,40.2800757 C31.8808595,40.4990394 31.6571858,40.7109397 31.4488161,40.9181311 C30.7295287,41.6385922 29.5793752,42 28.1302053,42 Z M6.37852994,8.17717648 C4.97174031,8.17717648 3.70150933,9.51450298 2.57725486,10.6976131 C2.35122673,10.9354124 2.13226198,11.1661483 1.91682893,11.3815803 C0.837309184,12.4599175 0.946791557,15.2934957 2.19465516,18.6026725 C3.73682623,22.6899943 6.80115544,27.1563822 10.8237497,31.1789567 C14.8451668,35.1991768 19.3092223,38.2634909 23.3977414,39.8044772 C26.7069344,41.0546891 29.5405266,41.1606393 30.6176919,40.0834793 C30.833125,39.8680473 31.063862,39.6490836 31.3016624,39.4242338 C32.5106774,38.2752632 33.8821502,36.9732534 33.8221115,35.5287995 C33.7809084,34.5363997 33.0580893,33.4686575 31.673667,32.3561808 C27.5309953,29.0246368 26.3726012,30.2006836 24.4513621,32.1489893 L24.0746486,32.5292327 C23.1564093,33.4486447 21.6648591,33.2449849 19.6400238,31.9288485 C18.2355887,31.0153226 16.5003519,29.5296659 14.4849345,27.5130811 C9.50407511,22.5334235 7.91128316,19.4855905 9.46993544,17.9234142 L9.84547175,17.5525886 C11.798496,15.631359 12.9769031,14.4717934 9.64416545,10.3267876 C8.52932882,8.94354933 7.4627586,8.22073377 6.47035386,8.17835371 C6.43974589,8.17717648 6.40913791,8.17717648 6.37852994,8.17717648 Z" id="Shape"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                {element==='header'?(<div className="text-contsct-us">
                    <p className="mb-0 text-nowrap text-left">
                        <FormattedHTMLMessage id="header.information" />
                    </p>
                    <p className="mb-0 text-nowrap text-left">
                        <FormattedHTMLMessage id="header.information-phone" />
                    </p>
                </div>):(<div className="text-contsct-us">
                    <p className="mb-0 text-nowrap text-left">
                        +(99871) 214 20 01
                    </p>
                    <p className="mb-0 text-nowrap text-left">
                        +(99871) 214 20 00
                    </p>
                </div>)}
                </ListGroup.Item>
                <ListGroup.Item as='li'  className="d-flex">
                	<div className="icon-contacts  mr-2" style={{paddingTop:'5px'}}>
                        <svg width="30px" height="23px" viewBox="0 0 30 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Footer/Blue-Copy" transform="translate(-369.000000, -34.000000)" fill={colorIcon}>
                                    <g id="Почта" transform="translate(369.000000, 20.000000)">
                                        <path d="M23.7499805,22.7816797 L23.7499805,16.5000195 C23.7499805,15.12125 22.6287891,14 21.2499609,14 L2.49996094,14 C1.12119141,14 0,15.1211914 0,16.5000195 L0,29 C0,30.3787695 1.12119141,31.5000195 2.50001953,31.5000195 L16.5165234,31.5000195 C17.3354297,34.38125 19.9847461,36.5 23.1250195,36.5 C24.3335156,36.5 25.5218555,36.1820117 26.563125,35.5796094 C26.8616016,35.406875 26.9641406,35.0247852 26.7907617,34.7257227 C26.6180273,34.4266602 26.2353516,34.3234766 25.936875,34.4980859 C25.0860352,34.9900391 24.1137305,35.2500195 23.1249609,35.2500195 C20.023125,35.2500195 17.4999609,32.7267969 17.4999609,29.6250195 C17.4999609,26.5232422 20.0231836,24.0000195 23.1249609,24.0000195 C26.2267383,24.0000195 28.7499609,26.5232422 28.7499609,29.6250195 L28.7499609,30.2500391 C28.7499609,30.9391016 28.189043,31.5000195 27.4999805,31.5000195 C26.810918,31.5000195 26.25,30.9391016 26.25,30.2500391 L26.25,27.7500195 C26.25,27.4045508 25.9704492,27.125 25.6249805,27.125 C25.456875,27.125 25.3058203,27.1930273 25.1936133,27.3007813 C24.6411914,26.8085352 23.9213086,26.4999805 23.1249609,26.4999805 C21.4019531,26.4999805 19.9999805,27.9019531 19.9999805,29.6249609 C19.9999805,31.3479687 21.4019531,32.75 23.1250195,32.75 C24.0564258,32.75 24.8845898,32.332168 25.4576367,31.6834766 C25.9103906,32.3266602 26.655293,32.75 27.5000391,32.75 C28.8788086,32.75 30,31.6288086 30,30.2499805 L30,29.6249609 C30,26.0450586 27.2486719,23.0989062 23.7499805,22.7816797 Z M2.50001953,15.2499805 L21.2500195,15.2499805 C21.2760352,15.2499805 21.297832,15.2632813 21.3234961,15.2648633 L12.3889453,22.5986328 C12.070957,22.7988477 11.6101172,22.7573047 11.4032227,22.6303906 L2.42730469,15.2647461 C2.45267578,15.2632227 2.47423828,15.2499805 2.50001953,15.2499805 Z M22.5000586,22.7816797 C19.0013086,23.0989062 16.2499805,26.0450586 16.2499805,29.6250195 C16.2499805,29.835957 16.2629297,30.0438477 16.2816211,30.2500391 L2.50001953,30.2500391 C1.81095703,30.2500391 1.25003906,29.6891211 1.25003906,29.0000586 L1.25003906,16.5000195 C1.25003906,16.3230078 1.28912109,16.1558398 1.35580078,16.0030273 L10.6653516,23.6375 C11.0291016,23.8749219 11.4472266,24.0000781 11.8750781,24.0000781 C12.2864648,24.0000781 12.6886523,23.8841211 13.0426758,23.6643945 C13.0780664,23.6454687 13.1116406,23.6229102 13.1433984,23.5966602 L22.3941797,16.0030273 C22.460918,16.1558398 22.5000586,16.3230078 22.5000586,16.5000781 L22.5000586,22.7816797 L22.5000586,22.7816797 Z M23.1250195,31.5000195 C22.0910742,31.5000195 21.2500195,30.6589648 21.2500195,29.6250195 C21.2500195,28.5910742 22.0910742,27.7500195 23.1250195,27.7500195 C24.1589648,27.7500195 25.0000195,28.5910742 25.0000195,29.6250195 C25.0000195,30.6589648 24.1589648,31.5000195 23.1250195,31.5000195 Z" id="Shape"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                	</div>
                	<div className="text-contsct-us">
                		<p className="mb-0 text-nowrap text-left">
                			<FormattedHTMLMessage id="header.email-text" />
                		</p>
                		<p className="mb-0 color-blue-text text-nowrap text-left">
                			<FormattedHTMLMessage id="header.email" />
                		</p>
                	</div>
                </ListGroup.Item>
                {element==='header'?(<ListGroup.Item as='li'  className="d-flex">
                    <div className="icon-contacts  mr-2">
                        <img src="/image/Icons/logo-cb.svg" alt=""/>
                    </div>
                    <div className="text-contsct-us">
                        <p className="mb-0 text-nowrap text-left">
                            <FormattedHTMLMessage id="header.virtual-reseption" />
                        </p>
                        <p className="mb-0 color-blue-text text-nowrap text-left">
                            <FormattedHTMLMessage id="header.virtual-reseption2" />
                        </p>
                    </div>
                </ListGroup.Item>):(<ListGroup.Item as='li'  className="d-flex">
                    <div className="icon-contacts  mr-2">
                        <svg width="14px" height="20px" viewBox="0 0 14 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">    
                            <defs>
                                <path d="M6.667,0 C10.343,0 13.333,2.991 13.333,6.667 C13.333,7.6597 13.10944,8.64511 12.68419,9.537937 L12.535,9.832 L7.031,19.785 C6.958,19.918 6.818,20 6.667,20 C6.5454,20 6.43148,19.94752 6.3534,19.858432 L6.302,19.785 L0.8,9.835 C0.276,8.864 2.84217094e-13,7.77 2.84217094e-13,6.667 C2.84217094e-13,2.991 2.991,0 6.667,0 Z M6.667,0.833 C3.45,0.833 0.833,3.45 0.833,6.667 C0.833,7.52477778 1.02420988,8.37702469 1.38766667,9.14929355 L1.532,9.435 L6.667,18.722 L11.804,9.432 C12.259,8.59 12.5,7.632 12.5,6.667 C12.5,3.45 9.883,0.833 6.667,0.833 Z M6.667,3.333 C8.505,3.333 10,4.829 10,6.667 C10,8.505 8.505,10 6.667,10 C4.829,10 3.333,8.505 3.333,6.667 C3.333,4.829 4.829,3.333 6.667,3.333 Z M6.667,4.167 C5.288,4.167 4.167,5.288 4.167,6.667 C4.167,8.045 5.288,9.167 6.667,9.167 C8.045,9.167 9.167,8.045 9.167,6.667 C9.167,5.288 8.045,4.167 6.667,4.167 Z" id="path-1"></path>
                            </defs>
                            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Menu/Navigation" transform="translate(-991.000000, -26.000000)">
                                    <g id="Функции" transform="translate(951.000000, 26.000000)">
                                        <g id="Офисы-и-банкоматы" transform="translate(40.000000, 0.000000)">
                                            <mask id="mask-2" fill="white">
                                                <use xlinkHref="#path-1"></use>
                                            </mask>
                                            <use id="Clip-452" fill={colorIcon} xlinkHref="#path-1"></use>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="text-contsct-us">
                        <p className="mb-0 text-left">
                            <FormattedHTMLMessage id="header.addres-text" />
                        </p>
                    </div>
                </ListGroup.Item>)}
                <ListGroup.Item as='li'  className="d-flex">
                	<div className="icon-contacts  mr-2">
                        <svg width="35px" height="35px" viewBox="0 0 35 35" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Footer/Blue-Copy" transform="translate(-907.000000, -28.000000)" fill={colorIcon}>
                                    <g id="Приемная-Copy" transform="translate(907.000000, 20.000000)">
                                        <path d="M17.5,8 C27.1640625,8 35,15.8359375 35,25.5 C35,35.1640625 27.1640625,43 17.5,43 C7.8359375,43 0,35.1640625 0,25.5 C0,15.8359375 7.8359375,8 17.5,8 Z M17.5,9.25 C15.3046875,9.25 13.1796875,9.6796875 11.171875,10.5234375 C9.2421875,11.34375 7.5,12.515625 6.0078125,14.0078125 C4.515625,15.5 3.34375,17.234375 2.5234375,19.171875 C1.6796875,21.1796875 1.25,23.3046875 1.25,25.5 C1.25,27.6953125 1.6796875,29.8203125 2.5234375,31.828125 C3.34375,33.7578125 4.515625,35.5 6.0078125,36.9921875 C7.5,38.484375 9.234375,39.65625 11.171875,40.4765625 C13.1796875,41.3203125 15.3046875,41.75 17.5,41.75 C19.6953125,41.75 21.828125,41.3203125 23.828125,40.4765625 C25.7578125,39.65625 27.5,38.484375 28.9921875,36.9921875 C30.484375,35.5 31.65625,33.7578125 32.4765625,31.828125 C33.3203125,29.8203125 33.75,27.6953125 33.75,25.5 C33.75,23.3046875 33.3203125,21.171875 32.4765625,19.171875 C31.65625,17.2421875 30.484375,15.5 28.9921875,14.0078125 C27.5,12.515625 25.765625,11.34375 23.828125,10.5234375 C21.8203125,9.6796875 19.6953125,9.25 17.5,9.25 Z M17.5,38.625 C17.845178,38.625 18.125,38.904822 18.125,39.25 C18.125,39.595178 17.845178,39.875 17.5,39.875 C17.154822,39.875 16.875,39.595178 16.875,39.25 C16.875,38.904822 17.154822,38.625 17.5,38.625 Z M24.375,36.78125 C24.720178,36.78125 25,37.061072 25,37.40625 C25,37.751428 24.720178,38.03125 24.375,38.03125 C24.029822,38.03125 23.75,37.751428 23.75,37.40625 C23.75,37.061072 24.029822,36.78125 24.375,36.78125 Z M10.625,36.78125 C10.970178,36.78125 11.25,37.061072 11.25,37.40625 C11.25,37.751428 10.970178,38.03125 10.625,38.03125 C10.279822,38.03125 10,37.751428 10,37.40625 C10,37.061072 10.279822,36.78125 10.625,36.78125 Z M13.7109375,19.0859375 C14.0078125,18.90625 14.390625,19 14.5703125,19.296875 L14.5703125,19.296875 L17.5390625,24.25 C17.953125,24.265625 18.359375,24.484375 18.5859375,24.875 C18.9296875,25.4765625 18.7265625,26.234375 18.1328125,26.5859375 L18.1328125,26.5859375 L18.1328125,36.125 C18.1328125,36.46875 17.8515625,36.75 17.5078125,36.75 C17.1640625,36.75 16.8828125,36.46875 16.8828125,36.125 L16.8828125,36.125 L16.8828125,26.5859375 C16.6953125,26.484375 16.5390625,26.328125 16.421875,26.1328125 C16.1875,25.7265625 16.2109375,25.234375 16.4375,24.859375 L16.4375,24.859375 L13.5,19.9453125 C13.3203125,19.6484375 13.4140625,19.265625 13.7109375,19.0859375 Z M5.59375,31.75 C5.93892797,31.75 6.21875,32.029822 6.21875,32.375 C6.21875,32.720178 5.93892797,33 5.59375,33 C5.24857203,33 4.96875,32.720178 4.96875,32.375 C4.96875,32.029822 5.24857203,31.75 5.59375,31.75 Z M29.40625,31.75 C29.751428,31.75 30.03125,32.029822 30.03125,32.375 C30.03125,32.720178 29.751428,33 29.40625,33 C29.061072,33 28.78125,32.720178 28.78125,32.375 C28.78125,32.029822 29.061072,31.75 29.40625,31.75 Z M31.25,24.875 C31.595178,24.875 31.875,25.154822 31.875,25.5 C31.875,25.845178 31.595178,26.125 31.25,26.125 C30.904822,26.125 30.625,25.845178 30.625,25.5 C30.625,25.154822 30.904822,24.875 31.25,24.875 Z M3.75,24.875 C4.09517797,24.875 4.375,25.154822 4.375,25.5 C4.375,25.845178 4.09517797,26.125 3.75,26.125 C3.40482203,26.125 3.125,25.845178 3.125,25.5 C3.125,25.154822 3.40482203,24.875 3.75,24.875 Z M29.40625,18 C29.751428,18 30.03125,18.279822 30.03125,18.625 C30.03125,18.970178 29.751428,19.25 29.40625,19.25 C29.061072,19.25 28.78125,18.970178 28.78125,18.625 C28.78125,18.279822 29.061072,18 29.40625,18 Z M5.59375,18 C5.93892797,18 6.21875,18.279822 6.21875,18.625 C6.21875,18.970178 5.93892797,19.25 5.59375,19.25 C5.24857203,19.25 4.96875,18.970178 4.96875,18.625 C4.96875,18.279822 5.24857203,18 5.59375,18 Z M10.625,12.96875 C10.970178,12.96875 11.25,13.248572 11.25,13.59375 C11.25,13.938928 10.970178,14.21875 10.625,14.21875 C10.279822,14.21875 10,13.938928 10,13.59375 C10,13.248572 10.279822,12.96875 10.625,12.96875 Z M24.375,12.96875 C24.720178,12.96875 25,13.248572 25,13.59375 C25,13.938928 24.720178,14.21875 24.375,14.21875 C24.029822,14.21875 23.75,13.938928 23.75,13.59375 C23.75,13.248572 24.029822,12.96875 24.375,12.96875 Z M17.5,11.125 C17.845178,11.125 18.125,11.404822 18.125,11.75 C18.125,12.095178 17.845178,12.375 17.5,12.375 C17.154822,12.375 16.875,12.095178 16.875,11.75 C16.875,11.404822 17.154822,11.125 17.5,11.125 Z" id="Combined-Shape"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                	</div>
                	<div className="text-contsct-us">
                		<p className="mb-0 text-nowrap text-left">
                			<FormattedHTMLMessage id="header.work-time-text" />
                		</p>
                		<p className="mb-0 color-blue-text text-nowrap text-left">
                			<FormattedHTMLMessage id="header.work-time" />
                		</p>
                	</div>
                </ListGroup.Item>
            </ListGroup>
	)
}