import React from "react";

export default function ItemCard(){
    return <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="card text-bg-dark w-25">
        <img src="http://127.0.0.1:8887/8-ball.png" class="card-img-top" alt="..."></img>
        <div class="card-body">
            <h5 class="card-title">Dark card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        </div>
    </div>
}