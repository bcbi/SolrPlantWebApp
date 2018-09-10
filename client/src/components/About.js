import React, { Component } from 'react';

class About extends Component {
    render(){

        const whiteDivStyle = {
            paddingLeft: '50px',
            paddingRight: '50px',
            paddingTop: '50px',
            paddingBottom: '20px',
            margin: '0'
            };
        

        return(
            <div style={whiteDivStyle}>
               <h3> Solr-Plant</h3>
                 <p>
                 Solr-Plant is a resource for extraction and normalization of plant names. It uses a combined taxonomy from three bonafied and validated sources (Catalogue of Life, Integrated Taxonoic Information System, and NCBI Taxonomy) for look-up and normalization of species names. 
                 This system is built leveraging fuzzy search capabilities of Apache Solr which is further enhanced by Smith-Waterman string alignment allowing resolution of misspelled names and variants.
                 </p>
                 <p>
                 Solr-plant is also accessible via a REST-compliant web service.</p>
                 <h4>REST API Example:</h4>
                 <code>
                 https://bcbi.brown.edu/solrplant_api/?plantname=Raulfia%20serpentina
                 </code>
           </div>
        );
      }
}


export default About;
