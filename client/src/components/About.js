import React, { Component } from 'react';

class About extends Component {
    render(){
        const greyDivStyle = {
            backgroundColor: '#f6f6f6',
            padding: '50px',
            margin: '0'
        };

        return(
            <div style={greyDivStyle}>
               <h3> Solr-Plant ChemGrab</h3>
                 <p>
                 Solr-Plant is a resource for extraction and normalization of plant names. It uses a combined taxonomy from three bonafied and validated sources (Catalogue of Life, Integrated Taxonoic Information System, and NCBI Taxonomy) for look-up and normalization of species names. 
                 This system is built leveraging fuzzy search capabilities of Apache Solr which is further enhanced by Smith-Waterman string alignment allowing resolution of misspelled names and variants.
                 </p>
                 <p>
                 Solr-plant is accessible via a REST-compliant web service.</p>
                 <h4>Example:</h4>
                 <code>
                 http://bcbi.brown.edu/solrplant_api/?plantname=Raulfia%20serpentina
                 </code>
                 <p>You can also submit your text using the interface below</p>
           </div>
        );
      }
}


export default About;
