const getLocationPromise = () => {
    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                resolve({lat, lng})
            }, 
            (err) => reject(err)
        );
    });
}


export default getLocationPromise;