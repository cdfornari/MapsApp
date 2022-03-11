export const getUserLocation = async(): Promise<[number,number]> => {
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                resolve([coords.longitude,coords.latitude]);
            },
            (error) => {
                alert("Cannot get geolocation")
                console.log(error);
                reject();
            }
        )
    });
}