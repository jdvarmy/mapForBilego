import React from 'react';

function Basket(){
    return(
        <div className="basket map-meta">
            <form id="map-ticket-form"
                  action="<?php echo get_site_url(null, '/cart') ?>"
                  className=""
                  method="post"
                  encType='multipart/form-data'>
                <div className="basket-content"></div>
            </form>
            <div className="basket-meta"></div>
        </div>
    );
}

export default Basket;