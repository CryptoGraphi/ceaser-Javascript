/**
 *  --------------------------------------------------------
 *      goal: to  a function in ceaser n+shift => encrypted text\
 * 
 *      author cryptograghi
 * 
 */


 /**
  *  function: GetTable
  *  purpose: to get all ascii characters 
  *  parms: one bool filter if true will only show character a-z A-z 0-9
  *     false with show symbols etc..``  * 
  *
  */


// declares not to be changed 

const LETTERS = GetTable(false);
const MAP = MapKeys(LETTERS);
const SHIFT = 13;
const MAPSHIFT = MapShift(MAP, SHIFT);

function GetTable(filter)
{

    string  = ''; 

    if (filter === true)
    {
        for (var i = 32; i <= 126; i++)
        {
            // returns filtered list based on the char code
             if(i >= 65 && i <= 90)
            {
                string += String.fromCharCode(i);
            } 
            else if( i >= 97 && i <= 122)
            {
                string += String.fromCharCode(i);
            } else {

            }
        
        }
            // return strings from ascii codes 
    } else {
            for(var i = 32; i <= 126; i++)
            {
            string += String.fromCharCode(i);
            }
        // return strings from ascii codes 
    }
        return string;
}

// tests 
//GetTable(true);
//GetTable(false);
/**
 *  function: map function 
 * 
 *  map the key to the correct shift n =>>
 * 
 */ 

function MapKeys(input)
{
    // create object that kill contain the keys
    var map =   { };

    for (let i = 0; i < input.length; i++)
    {
            map[input[i]] = input[i];
      
    }
    return map;
} 

// tests 

//console.log(MapKeys(GetTable(true)));

/**
 * 
 * FUNCTION MAPSHIFT
 * PURPOSE: TO MAKE THE KEYS IE A => TO THE SHIFTED VERSION A = B
 * SO A MAPPING FUNCTION TO PREVENT ERROR IF DOING THE COVERSIONS IN REAL TIME;
 * add if key levels are stupid high  ie 100 or 50000
 */

function MapShift(currentMap, shift)
{
    // lets create a new map of the new dictonarys now 

    for (keys in currentMap)
    {
        // check if the keys are actually valid

         if (currentMap.hasOwnProperty(keys) == true)
         { 
             let ASCII = keys.charCodeAt(keys);
              // apply the shift 
              if (ASCII >= 65 && ASCII <= 90)
              {
                  // apply shift 
                  let SHIFTASCII = ASCII + shift;
                  // check number
                  if (SHIFTASCII > 90)
                  {
                      // dont change just minus the alphebet
                      SHIFTASCII = SHIFTASCII - 26;
                      currentMap[keys] = String.fromCharCode(SHIFTASCII);
                  } else {
                      // add shift to our map 
                      currentMap[keys] = String.fromCharCode(SHIFTASCII);
                  }  
              } 
                else if (ASCII >= 97 && ASCII <= 122)
                {
                    // apply shift for next squence of characters 
                   let SHIFTASCII = ASCII + shift;
                   // trigger 
                   if (SHIFTASCII > 122)
                   {
                       // above our thresehold 
                       SHIFTASCII = SHIFTASCII - 26;
                       currentMap[keys] = String.fromCharCode(SHIFTASCII);
                   }
                   else
                   {
                        currentMap[keys] = String.fromCharCode(SHIFTASCII);
                   }

                }      
            
         }
    }
    return currentMap;
}
// TESTS
//MapShift(MAP, SHIFT)

/**
 * 
 * function: to pack the input => the data to encrypt
 * 
 * purpose: to pack the function to encrypt the message based on the shift level ie level of N
*/


function Pack(input, MAPSHIFT)
{

    SEED = ""
    for (let i = 0; i <= input.length; i++)
    {
        for (letters in MAPSHIFT)
        {
            if (letters === input[i])
            {
             SEED += MAPSHIFT[letters];
            }

        }
    }
    
  return SEED;
}
// TESTS
//Pack("TST", MAPSHIFT);
/*
    function: uPACK
    purpose: to decrypt the SEED = DATA
    using the current shift 

*/

function unPack(input, MAPSHIFT)
{
    UNPACKED_SEED = "";
    for (let x = 0; x < input.length; x++)
    {
        for (letters in MAPSHIFT)
        {
        // search though all the letters 
            if (MAPSHIFT[letters] == input[x])
            {
                UNPACKED_SEED += letters;
            }
        }
    }
    return UNPACKED_SEED;
}

// TESTS
// VAR TEST = pack("STRINGS", MAPSHIFT);
// unPack(TEST, MAPSHIFT);


/**
 *  function:  boomboom
 *  purpose: to crack the encryption using all possible matches
 *  
 */



function BoomBoom(data, shift_limit)
{
    
    console.log("starting the cracking:......................");
    var list =  [];
    for (let i = 0; i < shift_limit; i++)
    {
        // call the map
       const BOOM = MapShift(MAP, i);
       console.log("------------------------------------------");
       console.log("Starting attempt:", i);
       Guess = unPack(data, BOOM);
       list.push(Guess);
       console.log("Finished attempted:", i)
       console.log("-------------------------------------------");
    }

    console.log("Possible Matches: ")
    for (let x = 0; x < list.length; x++)
    {
        if (list[x] != "")
        {
        console.log("try: ", x, list[x]);
        }
    }
    return "FINISHED!";
}

// tests
 //test = Pack("secert sauce rekodajksfhuejiokwewldskfoijdk", MAPSHIFT);
 //BoomBoom(test, 100);
