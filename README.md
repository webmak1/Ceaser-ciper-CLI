# Ceaser chiper CLI tool
![alt text](https://res.cloudinary.com/practicaldev/image/fetch/s--1-VesoOt--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/w5r4uoh0htwo6wuwshq7.jpg)

<h2> Usage: </h2>

Pass <code> node index </code> into command interpreter with specified options  

***

<h2> Options: </h2>

You need to use 2 mandatory options with arguments: 

+ ### **Shift**
Points out how much letters will replace down if value is positive
or replace up if negative;

    ``` --shift <value>  ``` or ``` -s <value>```

_examples:_

    ``` node index --shift 7```

    ``` node index -s -3```

+ ### **Action**
Pass 'encode' to encrypt message or 'decode' vice versa

    ``` --action <value>  ``` or ``` -a <value>```

_exmaples:_

    ``` node index --action encode```

    ``` node index -a decode```  

Also you can you use 2 additional options: 

+ ### **Input**

Tells program where obtain source string.
 Input value should be file with .txt extension. If doesn't specified program will recive input from process input stream.

    ``` node index --input <sourceFile>```


 _exmaples:_

    ``` node index --input source.txt```

    ``` node index -i ./folder/source.txt```

+ ### **Output**

Tells program where obtain source string.
Input value should be file with .txt extension. If doesn't specified program will dispatch output value to process output stream.
 
    ``` node index --output <distFile>```

 _exmaples:_

    ``` node index --output dist.txt```

    ``` node index -o ./folder/dist.txt```

*** 

<h2>  Usage example: </h2>

Create new encrypted message from index.txt file and wirite it to output.txt with shift 7.

    ```node index -a encode -s 7 -i "./input.txt" -o "./output.txt"```

> input.txt

    ```input.txt This is secret. Message about "_" symbol!```

> output.txt  

    ```output.txt Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!```