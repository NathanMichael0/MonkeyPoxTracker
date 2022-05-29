
import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import './WorldMap.css'
import axios from "axios";


const baseUrl = "http://localhost:5000";

 let cities= [
  {
    "ID": "3",
    "Status": "confirmed",
    "Location": "London",
    "City": "London",
    "Country": "England",
    "Age": "",
    "Gender": "",
    "Date_onset": "2022-04-30",
    "Date_confirmation": "2022-05-13",
    "Symptoms": "vesicular rash",
    "Hospitalised (Y/N/NA)": "N",
    "Date_hospitalisation": "",
    "Isolated (Y/N/NA)": "Y",
    "Date_isolation": "",
    "Outcome": "",
    "Contact_comment": "",
    "Contact_ID": "2",
    "Contact_location": "Household",
    "Travel_history (Y/N/NA)": "N",
    "Travel_history_entry": "",
    "Travel_history_start": "",
    "Travel_history_location": "",
    "Travel_history_country": "",
    "Genomics_Metadata": "West African Clade",
    "Confirmation_method": "RT-PCR",
    "Notes": "",
    "Source": "https://www.gov.uk/government/news/monkeypox-cases-confirmed-in-england-latest-updates",
    "Source_II": "",
    "Date_entry": "2022-05-18",
    "Date_last_modified": "2022-05-18",
    "coordinates": [
        -0.1276474,
        51.5073219
    ]
}
  
];
let idCodes = [{
	"code": "AF",
	"id": 4,
	"name": "Afghanistan"
}, {
	"code": "AL",
	"id": 8,
	"name": "Albania"
}, {
	"code": "DZ",
	"id": 12,
	"name": "Algeria"
}, {
	"code": "AO",
	"id": 24,
	"name": "Angola"
}, {
	"code": "AQ",
	"id": 10,
	"name": "Antarctica"
}, {
	"code": "AR",
	"id": 32,
	"name": "Argentina"
}, {
	"code": "AM",
	"id": 51,
	"name": "Armenia"
}, {
	"code": "AU",
	"id": 36,
	"name": "Australia"
}, {
	"code": "AT",
	"id": 40,
	"name": "Austria"
}, {
	"code": "AZ",
	"id": 31,
	"name": "Azerbaijan"
}, {
	"code": "BS",
	"id": 44,
	"name": "Bahamas"
}, {
	"code": "BD",
	"id": 50,
	"name": "Bangladesh"
}, {
	"code": "BY",
	"id": 112,
	"name": "Belarus"
}, {
	"code": "BE",
	"id": 56,
	"name": "Belgium"
}, {
	"code": "BZ",
	"id": 84,
	"name": "Belize"
}, {
	"code": "BJ",
	"id": 204,
	"name": "Benin"
}, {
	"code": "BT",
	"id": 64,
	"name": "Bhutan"
}, {
	"code": "BO",
	"id": 68,
	"name": "Bolivia"
}, {
	"code": "BA",
	"id": 70,
	"name": "Bosnia and Herzegovina"
}, {
	"code": "BW",
	"id": 72,
	"name": "Botswana"
}, {
	"code": "BR",
	"id": 76,
	"name": "Brazil"
}, {
	"code": "BN",
	"id": 96,
	"name": "Brunei Darussalam"
}, {
	"code": "BG",
	"id": 100,
	"name": "Bulgaria"
}, {
	"code": "BF",
	"id": 854,
	"name": "Burkina Faso"
}, {
	"code": "BI",
	"id": 108,
	"name": "Burundi"
}, {
	"code": "KH",
	"id": 116,
	"name": "Cambodia"
}, {
	"code": "CM",
	"id": 120,
	"name": "Cameroon"
}, {
	"code": "CA",
	"id": 124,
	"name": "Canada"
}, {
	"code": "CF",
	"id": 140,
	"name": "Central African Republic"
}, {
	"code": "TD",
	"id": 148,
	"name": "Chad"
}, {
	"code": "CL",
	"id": 152,
	"name": "Chile"
}, {
	"code": "CN",
	"id": 156,
	"name": "China"
}, {
	"code": "CO",
	"id": 170,
	"name": "Colombia"
}, {
	"code": "CG",
	"id": 178,
	"name": "Congo, Republic of the Congo"
}, {
	"code": "CD",
	"id": 180,
	"name": "Congo, the Democratic Republic of the Congo"
}, {
	"code": "CR",
	"id": 188,
	"name": "Costa Rica"
}, {
	"id": 384,
	"name": "Cote d'Ivoire"
}, {
	"code": "HR",
	"id": 191,
	"name": "Croatia"
}, {
	"code": "CU",
	"id": 192,
	"name": "Cuba"
}, {
	"code": "CY",
	"id": 196,
	"name": "Cyprus"
}, {
	"code": "CZ",
	"id": 203,
	"name": "Czech Republic"
}, {
	"code": "DK",
	"id": 208,
	"name": "Denmark"
}, {
	"code": "DJ",
	"id": 262,
	"name": "Djibouti"
}, {
	"code": "DO",
	"id": 214,
	"name": "Dominican Republic"
}, {
	"code": "EC",
	"id": 218,
	"name": "Ecuador"
}, {
	"code": "EG",
	"id": 818,
	"name": "Egypt"
}, {
	"code": "SV",
	"id": 222,
	"name": "El Salvador"
}, {
	"code": "GQ",
	"id": 226,
	"name": "Equatorial Guinea"
}, {
	"code": "ER",
	"id": 232,
	"name": "Eritrea"
}, {
	"code": "EE",
	"id": 233,
	"name": "Estonia"
}, {
	"code": "ET",
	"id": 231,
	"name": "Ethiopia"
}, {
	"code": "FK",
	"id": 238,
	"name": "Falkland Islands (Malvinas)"
}, {
	"code": "FJ",
	"id": 242,
	"name": "Fiji"
}, {
	"code": "FI",
	"id": 246,
	"name": "Finland"
}, {
	"code": "FR",
	"id": 250,
	"name": "France"
}, {
	"code": "TF",
	"id": 260,
	"name": "French Southern Territories"
}, {
	"code": "GA",
	"id": 266,
	"name": "Gabon"
}, {
	"code": "GM",
	"id": 270,
	"name": "Gambia"
}, {
	"code": "GE",
	"id": 268,
	"name": "Georgia"
}, {
	"code": "DE",
	"id": 276,
	"name": "Germany"
}, {
	"code": "GH",
	"id": 288,
	"name": "Ghana"
}, {
	"code": "GR",
	"id": 300,
	"name": "Greece"
}, {
	"code": "GL",
	"id": 304,
	"name": "Greenland"
}, {
	"code": "GT",
	"id": 320,
	"name": "Guatemala"
}, {
	"code": "GN",
	"id": 324,
	"name": "Guinea"
}, {
	"code": "GW",
	"id": 624,
	"name": "Guinea-Bissau"
}, {
	"code": "GY",
	"id": 328,
	"name": "Guyana"
}, {
	"code": "HT",
	"id": 332,
	"name": "Haiti"
}, {
	"code": "HN",
	"id": 340,
	"name": "Honduras"
}, {
	"code": "HU",
	"id": 348,
	"name": "Hungary"
}, {
	"code": "IS",
	"id": 352,
	"name": "Iceland"
}, {
	"code": "IN",
	"id": 356,
	"name": "India"
}, {
	"code": "ID",
	"id": 360,
	"name": "Indonesia"
}, {
	"code": "IR",
	"id": 364,
	"name": "Iran"
}, {
	"code": "IQ",
	"id": 368,
	"name": "Iraq"
}, {
	"code": "IE",
	"id": 372,
	"name": "Ireland"
}, {
	"code": "IL",
	"id": 376,
	"name": "Israel"
}, {
	"code": "IT",
	"id": 380,
	"name": "Italy"
}, {
	"code": "JM",
	"id": 388,
	"name": "Jamaica"
}, {
	"code": "JP",
	"id": 392,
	"name": "Japan"
}, {
	"code": "JO",
	"id": 400,
	"name": "Jordan"
}, {
	"code": "KZ",
	"id": 398,
	"name": "Kazakhstan"
}, {
	"code": "KE",
	"id": 404,
	"name": "Kenya"
}, {
	"code": "KP",
	"id": 408,
	"name": "North Korea"
}, {
	"code": "KR",
	"id": 410,
	"name": "South Korea"
}, {
	"code": "KW",
	"id": 414,
	"name": "Kuwait"
}, {
	"code": "KG",
	"id": 417,
	"name": "Kyrgyzstan"
}, {
	"code": "LA",
	"id": 418,
	"name": "Laos"
}, {
	"code": "LV",
	"id": 428,
	"name": "Latvia"
}, {
	"code": "LB",
	"id": 422,
	"name": "Lebanon"
}, {
	"code": "LS",
	"id": 426,
	"name": "Lesotho"
}, {
	"code": "LR",
	"id": 430,
	"name": "Liberia"
}, {
	"code": "LY",
	"id": 434,
	"name": "Libya"
}, {
	"code": "LT",
	"id": 440,
	"name": "Lithuania"
}, {
	"code": "LU",
	"id": 442,
	"name": "Luxembourg"
}, {
	"id": 807,
	"name": "Macedonia"
}, {
	"code": "MG",
	"id": 450,
	"name": "Madagascar"
}, {
	"code": "MW",
	"id": 454,
	"name": "Malawi"
}, {
	"code": "MY",
	"id": 458,
	"name": "Malaysia"
}, {
	"code": "ML",
	"id": 466,
	"name": "Mali"
}, {
	"code": "MR",
	"id": 478,
	"name": "Mauritania"
}, {
	"code": "MX",
	"id": 484,
	"name": "Mexico"
}, {
	"code": "MD",
	"id": 498,
	"name": "Moldova"
}, {
	"code": "MN",
	"id": 496,
	"name": "Mongolia"
}, {
	"code": "ME",
	"id": 499,
	"name": "Montenegro"
}, {
	"code": "MA",
	"id": 504,
	"name": "Morocco"
}, {
	"code": "MZ",
	"id": 508,
	"name": "Mozambique"
}, {
	"code": "MM",
	"id": 104,
	"name": "Myanmar"
}, {
	"code": "NA",
	"id": 516,
	"name": "Namibia"
}, {
	"code": "NP",
	"id": 524,
	"name": "Nepal"
}, {
	"code": "NL",
	"id": 528,
	"name": "Netherlands"
}, {
	"code": "NC",
	"id": 540,
	"name": "New Caledonia"
}, {
	"code": "NZ",
	"id": 554,
	"name": "New Zealand"
}, {
	"code": "NI",
	"id": 558,
	"name": "Nicaragua"
}, {
	"code": "NE",
	"id": 562,
	"name": "Niger"
}, {
	"code": "NG",
	"id": 566,
	"name": "Nigeria"
}, {
	"code": "NO",
	"id": 578,
	"name": "Norway"
}, {
	"code": "OM",
	"id": 512,
	"name": "Oman"
}, {
	"code": "PK",
	"id": 586,
	"name": "Pakistan"
}, {
	"code": "PA",
	"id": 591,
	"name": "Panama"
}, {
	"code": "PG",
	"id": 598,
	"name": "Papua New Guinea"
}, {
	"code": "PY",
	"id": 600,
	"name": "Paraguay"
}, {
	"code": "PE",
	"id": 604,
	"name": "Peru"
}, {
	"code": "PH",
	"id": 608,
	"name": "Philippines"
}, {
	"code": "PL",
	"id": 616,
	"name": "Poland"
}, {
	"code": "PT",
	"id": 620,
	"name": "Portugal"
}, {
	"code": "PR",
	"id": 630,
	"name": "Puerto Rico"
}, {
	"code": "QA",
	"id": 634,
	"name": "Qatar"
}, {
	"code": "RO",
	"id": 642,
	"name": "Romania"
}, {
	"code": "RU",
	"id": 643,
	"name": "Russian Federation"
}, {
	"code": "RW",
	"id": 646,
	"name": "Rwanda"
}, {
	"code": "SA",
	"id": 682,
	"name": "Saudi Arabia"
}, {
	"code": "SN",
	"id": 686,
	"name": "Senegal"
}, {
	"code": "RS",
	"id": 688,
	"name": "Serbia"
}, {
	"code": "SL",
	"id": 694,
	"name": "Sierra Leone"
}, {
	"code": "SK",
	"id": 703,
	"name": "Slovakia"
}, {
	"code": "SI",
	"id": 705,
	"name": "Slovenia"
}, {
	"code": "SB",
	"id": 90,
	"name": "Solomon Islands"
}, {
	"code": "SO",
	"id": 706,
	"name": "Somalia"
}, {
	"code": "ZA",
	"id": 710,
	"name": "South Africa"
}, {
	"code": "SS",
	"id": 728,
	"name": "South Sudan"
}, {
	"code": "ES",
	"id": 724,
	"name": "Spain"
}, {
	"code": "LK",
	"id": 144,
	"name": "Sri Lanka"
}, {
	"code": "SD",
	"id": 729,
	"name": "Sudan"
}, {
	"code": "SR",
	"id": 740,
	"name": "Suriname"
}, {
	"code": "SZ",
	"id": 748,
	"name": "Swaziland"
}, {
	"code": "SE",
	"id": 752,
	"name": "Sweden"
}, {
	"code": "CH",
	"id": 756,
	"name": "Switzerland"
}, {
	"code": "SY",
	"id": 760,
	"name": "Syrian Arab Republic"
}, {
	"code": "TW",
	"id": 158,
	"name": "Taiwan, Province of China"
}, {
	"code": "TJ",
	"id": 762,
	"name": "Tajikistan"
}, {
	"code": "TZ",
	"id": 834,
	"name": "Tanzania"
}, {
	"code": "TH",
	"id": 764,
	"name": "Thailand"
}, {
	"code": "TL",
	"id": 626,
	"name": "Timor-Leste"
}, {
	"code": "TG",
	"id": 768,
	"name": "Togo"
}, {
	"code": "TT",
	"id": 780,
	"name": "Trinidad and Tobago"
}, {
	"code": "TN",
	"id": 788,
	"name": "Tunisia"
}, {
	"code": "TR",
	"id": 792,
	"name": "Turkey"
}, {
	"code": "TM",
	"id": 795,
	"name": "Turkmenistan"
}, {
	"code": "UG",
	"id": 800,
	"name": "Uganda"
}, {
	"code": "UA",
	"id": 804,
	"name": "Ukraine"
}, {
	"code": "AE",
	"id": 784,
	"name": "United Arab Emirates"
}, {
	"code": "GB",
	"id": 826,
	"name": "United Kingdom"
}, {
	"code": "US",
	"id": 840,
	"name": "United States"
}, {
	"code": "UY",
	"id": 858,
	"name": "Uruguay"
}, {
	"code": "UZ",
	"id": 860,
	"name": "Uzbekistan"
}, {
	"code": "VU",
	"id": 548,
	"name": "Vanuatu"
}, {
	"code": "VE",
	"id": 862,
	"name": "Venezuela"
}, {
	"code": "VN",
	"id": 704,
	"name": "Viet Nam"
}, {
	"code": "EH",
	"id": 732,
	"name": "Western Sahara"
}, {
	"code": "YE",
	"id": 887,
	"name": "Yemen"
}, {
	"code": "ZM",
	"id": 894,
	"name": "Zambia"
}, {
	"code": "ZW",
	"id": 716,
	"name": "Zimbabwe"
}];
let countr = [{field5: 0}];
let looksets = [];


const projection = geoEqualEarth()
  .scale(160)
  .translate([ 800 / 2, 450 / 2 ])

const WorldMap = () => {
  
     
    
    
  const [geographies, setGeographies] = useState([])
  const [poxData, setPoxData] = useState([0])
  const [load, setLoad] = useState(0)
  const [pointedLocation, setPointedLocation] = useState("");
  const [tooltipStyle, setToolTipStyle] = useState({display: "none"});
  const [countryLook, setCountryLook] = useState([{coordinates:[-1000,-1000]}]);
  const [regionalCases, setRegionalCases] = useState(0)
  const [userLocation, setUserLocation] = useState("");
  const [userRegionalCases, setUserRegionalCases] = useState(0)

  

  useEffect(() => {
    handleMPUpdates();
    fetch("/world-110m.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          setGeographies(feature(worlddata, worlddata.objects.countries).features)
         
        })
      }) 
    }
  , [])

 

  const handleMPUpdates = async () =>{
   

    try {
      console.log("trying to update");
      const data = await axios.get(`${baseUrl}/cases`);
	  const res = await axios.get('https://geolocation-db.com/json/')
      
      let temp = data.data;
	  
        
        cities = temp[0].slice();
		countr = temp[1].slice();
		//console.log("printtt", temp[0], "\n" , temp[1]);
		
		
		setUserLocation(res.data.country_name);

	  for(let CountryCase of countr){
		if(CountryCase["COUNTA of Country"] === res.data.country_name ){

			setUserRegionalCases((!CountryCase.field5)? 0 : CountryCase.field5 );

		break;
		}
		
		}
        setLoad(1);

	
		console.log("here ",  countr)
    
    } catch (err) {
      console.log(err);
      setLoad(1);        
    }

  };
 

  const handleCountryClick = (countryIndex) => {
   // console.log("Clicked on country: ", geographies[countryIndex]);
   setRegionalCases(0)
	
   for(let i = 0; i<idCodes.length; i++ )
   {
	   if  ((geographies[countryIndex].id) == (idCodes[i].id)){
		 setPointedLocation(idCodes[i].name)


		 for(let CountryCase of countr){
			if(CountryCase["COUNTA of Country"] === idCodes[i].name ){


				console.log("found in ...", CountryCase)

				handleLocationMouseOver(CountryCase);
			return;
			}
			
			}
	   
	   }
   }



	
		setCountryLook([{coordinates:[-1000,-1000]}]);
	
	
    

  
  }

  const handleMarkerClick = (i,event)=> {
    //console.log("Marker: ", cities[i])
    //setPoxData([i]);
	let listC =[];
	if(event.LocalCasesCoord){
		for(let i =0; i< event.LocalCasesCoord.length; i++){
			
			listC.push({clickedCountry:event["COUNTA of Country"] ,cityCases: event.LocalCases[i], coordinates: event.LocalCasesCoord[i], cityCasesNum:event.LocalCasesNum[i]});
		}

		console.log("Clicked on Country: ", event)
		
		handleLocationMouseOver(event);
		setCountryLook(listC.slice());
	looksets = listC.slice();
	}
else{

	console.log("Clicked on City: ", event)
	handleLocationMouseOver(event);

}

	
	handleLocationMouseMove(event);


  }


 
 const handleLocationMouseOver =event => {
	setPointedLocation("")
	setRegionalCases(0)


	
	if(event.cityCases){
		setPointedLocation(event.cityCases+", "+ event.clickedCountry)
		setRegionalCases(event.cityCasesNum)

	}
	else if(event["COUNTA of Country"]){
		setCountryLook([{coordinates:[-1000,-1000]}]);
		setPointedLocation(event["COUNTA of Country"])
		setRegionalCases(Number(event["field5"]))
	}


	else{
		 for(let i = 0; i<idCodes.length; i++ )
		{
			if  ( typeof(event) === "number" && ((geographies[event].id) == (idCodes[i].id))){
			  setPointedLocation(idCodes[i].name)
			  
			break;
			}
		}
	}
 
   

    
  }

  const  handleLocationMouseMove = event => {
    //console.log(event);

	var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

	console.log("mousemoveX", (posX),"mousemoveY", (posY))
    setToolTipStyle({
      display: "block",
      top: (posY-125  ),
      left:  ( posX  )
    });
    
  }
  const showTooltip = event => {
    //handleLocationMouseOver(event);
    handleLocationMouseMove(event);
  }

  
  return (

    <div id = "grad">
	
	 
     <section id ="grad">
       <h1>World Monkey Pox cases</h1>
	   <p id = "grad"> Total Cases world wide (Confirmed and suspected) : {countr[(countr.length) - 1]["field5"]}</p>
	   <p id = "grad"> Total Cases in {userLocation} : {userRegionalCases} </p>

 
      
      
     
     </section>
{

poxData.map((vl) => {
  if (load !==0)
  {
return(
<div>
<svg /**width={ 600 } height={ 400 }**/   viewBox="0 0 800 450"  >
<g className="countries" >
  

  {
    
    geographies.map((d,i) => 
      
           
           {
             return(

              <>
              <path class= "dropdown"
        key={ `path-${ i }` }
        d={ geoPath().projection(projection)(d) }
        className="country"
        fill={ `rgba(38,50,56,${ 1 / geographies.length * i})` }
        stroke="#FFFFFF"
        strokeWidth={ 0.5 }
        onClick={ () => {
          handleCountryClick(i)
          showTooltip(i);
          
        }
      
        }
    
     >
    </path> 
              
            
               </>
          
             )
           })
    
  }
 
</g>

<g className="markers">
	
  {   
      countr.map(  (c, i) =>      {

	if(  (c.coordinates)[0] !== 0 &&  (c.coordinates)[1] !== 0   && c["COUNTA of Country"]!== "Country"   && c["COUNTA of Country"]!== "Grand Total") 	{

		if((countryLook[0]) && (countryLook[0].coordinates[0] != -1000))

		{

//			console.log(looksets);
			return(	
					looksets.map( (d,j) => 
					{
		
		
						return(
		
							<circle
							key={ `marker-${j}` }
							cx={ projection(d.coordinates)[0] }
							cy={ projection(d.coordinates)[1] }
							r={ 5}
							fill="#E91E63"
							stroke="#FFFFFF"
							className="marker"
							onClick={ 
							  () => {handleMarkerClick(j, d); }
							  }>
							</circle>
							
							);
		
		
		
					})
			);
		

		}
		else{
			return(

				<circle
				key={ `marker-${i}` }
				cx={ projection(c.coordinates)[0] }
				cy={ projection(c.coordinates)[1] }
				r={ 5}
				fill="#E91E63"
				stroke="#FFFFFF"
				className="marker"
				onClick={ 
				  () => {handleMarkerClick(i, c); }
				  }>
				</circle>
				
				);

		
				}}
       
      
      }  
      )
 
  }
</g>



</svg>



	

<table class="tooltipdisp" style={tooltipStyle}>
	
	<p>   {pointedLocation} </p>  

<p>total cases: {regionalCases}</p> 

</table>




      </div>


)
    
  

}

})}
 


  </div>
  
  )
}

export default WorldMap

