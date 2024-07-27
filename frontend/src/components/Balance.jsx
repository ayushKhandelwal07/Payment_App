import React, { useEffect, useState } from "react";
import axios from "axios";

    export function Balance() {
        const [balance, setBalance] = useState(null);

        const fetchBalance = async () => {
            try {
                console.log("reached")
                const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers : {
                        Authorization : "Bearer " + localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };
        
        useEffect(() => {
            fetchBalance();
        }, []);

        return (
            <div className="flex mt-5">
                <div className="font-bold ml-10 text-xl">Your balance</div>
                <div className="font-bold ml-3 text-xl">Rs {balance}</div>
            </div>
        );
    }
