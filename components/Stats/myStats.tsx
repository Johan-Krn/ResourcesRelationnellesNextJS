"use client"
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';


const StatsComponent = () => {
    const [data, setData] = useState(null);
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('https://8443-ilanlo-apiressourcesrel-uz6mpifos28.ws-eu110.gitpod.io/api/stats/ressources', {
                method: 'GET',
                headers: {
                    'Accept': '*/*'
                }
            });
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);
    useEffect(() => {
        fetchData();

    }, [fetchData])

    return (
        <div>
            <div>
                <div>Nombre de ressources : 6 </div>
                <div>Nombre de nouvelle ressources ce mois ci : 1 </div>
                <div>Nombre d'utilisateurs : 2 </div>
                <div>Nombre de nouvel utilisateurs ce mois ci : 1 </div>

            </div>

            {/* <div>Value 2: {data["countRessources"]}</div> */}
            {/* Update other divs as needed */}
        </div>
    );
};
// };

export default StatsComponent;