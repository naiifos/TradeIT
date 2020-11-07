
    useEffect(() => {


        setTimeout(
            function () {
            }, 5000);


    }, [data])
    useEffect(() => {

        /* la taille de data vaut toujours 0*/
        if (data.length !== 0) {

            //       console.log(" data length est rempli =  " + data.length)

            let results = data.filter(item =>
                item.Title.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            //       console.log(" value de results = " + results.length)



            if (searchTerm.toString().length === 0) {
                //   console.log("data table = " + data.length)

                //        console.log("Empty research - tampon table = " + tampon.length)
                setData(tampon)

                /*
                setData(tampon)
                
                if (!isEmpty) {
                    setTampon(data);
                    setIsEmpty(true);
                } else {
                    setData(tampon);
                }
                */
            } else {

                setData(results);

            }


        } else {
            //          console.log(" data length vaut 0  " + data.length)
        }

        //    console.log(" Use Effect recherche  = "+ searchTerm) 
        //  console.log("data table = " + data.length)

        //  console.log("tampon table = " + tampon.length)

    }, [searchTerm]);