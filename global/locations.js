Locations = {};

/*
Locations.locations = {

    "-10|-10": { biome: "forest", hasPath: false, accessible: true },
    "-9|-10": { biome: "forest", hasPath: false, accessible: true },
    "-8|-10": { biome: "forest", hasPath: false, accessible: true },
    "-7|-10": { biome: "forest", hasPath: false, accessible: true },
    "-6|-10": { biome: "forest", hasPath: false, accessible: true },
    "-5|-10": { biome: "forest", hasPath: false, accessible: true },
    "-4|-10": { biome: "forest", hasPath: false, accessible: true },
    "-3|-10": { biome: "forest", hasPath: false, accessible: true },
    "-2|-10": { biome: "forest", hasPath: false, accessible: true },
    "-1|-10": { biome: "forest", hasPath: false, accessible: true },
    "0|-10": { biome: "forest", hasPath: false, accessible: true },
    "1|-10": { biome: "forest", hasPath: false, accessible: true },
    "2|-10": { biome: "forest", hasPath: false, accessible: true },
    "3|-10": { biome: "forest", hasPath: false, accessible: true },
    "4|-10": { biome: "forest", hasPath: false, accessible: true },
    "5|-10": { biome: "forest", hasPath: false, accessible: true },
    "6|-10": { biome: "forest", hasPath: false, accessible: true },
    "7|-10": { biome: "forest", hasPath: false, accessible: true },
    "8|-10": { biome: "forest", hasPath: false, accessible: true },
    "9|-10": { biome: "forest", hasPath: false, accessible: true },
    "10|-10": { biome: "forest", hasPath: false, accessible: true },


    "-10|-9": { biome: "forest", hasPath: false, accessible: true },
    "-9|-9": { biome: "forest", hasPath: false, accessible: true },
    "-8|-9": { biome: "forest", hasPath: false, accessible: true },
    "-7|-9": { biome: "forest", hasPath: false, accessible: true },
    "-6|-9": { biome: "forest", hasPath: false, accessible: true },
    "-5|-9": { biome: "forest", hasPath: false, accessible: true },
    "-4|-9": { biome: "forest", hasPath: false, accessible: true },
    "-3|-9": { biome: "forest", hasPath: false, accessible: true },
    "-2|-9": { biome: "forest", hasPath: false, accessible: true },
    "-1|-9": { biome: "forest", hasPath: false, accessible: true },
    "0|-9": { biome: "forest", hasPath: false, accessible: true },
    "1|-9": { biome: "forest", hasPath: false, accessible: true },
    "2|-9": { biome: "forest", hasPath: false, accessible: true },
    "3|-9": { biome: "forest", hasPath: false, accessible: true },
    "4|-9": { biome: "forest", hasPath: false, accessible: true },
    "5|-9": { biome: "forest", hasPath: false, accessible: true },
    "6|-9": { biome: "forest", hasPath: false, accessible: true },
    "7|-9": { biome: "forest", hasPath: false, accessible: true },
    "8|-9": { biome: "forest", hasPath: false, accessible: true },
    "9|-9": { biome: "forest", hasPath: false, accessible: true },
    "10|-9": { biome: "forest", hasPath: false, accessible: true },


    "-10|-8": { biome: "forest", hasPath: false, accessible: true },
    "-9|-8": { biome: "forest", hasPath: false, accessible: true },
    "-8|-8": { biome: "forest", hasPath: false, accessible: true },
    "-7|-8": { biome: "forest", hasPath: false, accessible: true },
    "-6|-8": { biome: "forest", hasPath: false, accessible: true },
    "-5|-8": { biome: "forest", hasPath: false, accessible: true },
    "-4|-8": { biome: "forest", hasPath: false, accessible: true },
    "-3|-8": { biome: "forest", hasPath: false, accessible: true },
    "-2|-8": { biome: "forest", hasPath: false, accessible: true },
    "-1|-8": { biome: "forest", hasPath: false, accessible: true },
    "0|-8": { biome: "forest", hasPath: false, accessible: true },
    "1|-8": { biome: "forest", hasPath: false, accessible: true },
    "2|-8": { biome: "forest", hasPath: false, accessible: true },
    "3|-8": { biome: "forest", hasPath: false, accessible: true },
    "4|-8": { biome: "forest", hasPath: false, accessible: true },
    "5|-8": { biome: "forest", hasPath: false, accessible: true },
    "6|-8": { biome: "forest", hasPath: false, accessible: true },
    "7|-8": { biome: "forest", hasPath: false, accessible: true },
    "8|-8": { biome: "forest", hasPath: false, accessible: true },
    "9|-8": { biome: "forest", hasPath: false, accessible: true },
    "10|-8": { biome: "forest", hasPath: false, accessible: true },


    "-10|-7": { biome: "forest", hasPath: false, accessible: true },
    "-9|-7": { biome: "forest", hasPath: false, accessible: true },
    "-8|-7": { biome: "forest", hasPath: false, accessible: true },
    "-7|-7": { biome: "forest", hasPath: false, accessible: true },
    "-6|-7": { biome: "forest", hasPath: false, accessible: true },
    "-5|-7": { biome: "forest", hasPath: false, accessible: true },
    "-4|-7": { biome: "forest", hasPath: false, accessible: true },
    "-3|-7": { biome: "forest", hasPath: false, accessible: true },
    "-2|-7": { biome: "forest", hasPath: false, accessible: true },
    "-1|-7": { biome: "forest", hasPath: false, accessible: true },
    "0|-7": { biome: "forest", hasPath: false, accessible: true },
    "1|-7": { biome: "forest", hasPath: false, accessible: true },
    "2|-7": { biome: "forest", hasPath: false, accessible: true },
    "3|-7": { biome: "forest", hasPath: false, accessible: true },
    "4|-7": { biome: "forest", hasPath: false, accessible: true },
    "5|-7": { biome: "forest", hasPath: false, accessible: true },
    "6|-7": { biome: "forest", hasPath: false, accessible: true },
    "7|-7": { biome: "forest", hasPath: false, accessible: true },
    "8|-7": { biome: "forest", hasPath: false, accessible: true },
    "9|-7": { biome: "forest", hasPath: false, accessible: true },
    "10|-7": { biome: "forest", hasPath: false, accessible: true },


    "-10|-6": { biome: "forest", hasPath: false, accessible: true },
    "-9|-6": { biome: "forest", hasPath: false, accessible: true },
    "-8|-6": { biome: "forest", hasPath: false, accessible: true },
    "-7|-6": { biome: "forest", hasPath: false, accessible: true },
    "-6|-6": { biome: "forest", hasPath: false, accessible: true },
    "-5|-6": { biome: "forest", hasPath: false, accessible: true },
    "-4|-6": { biome: "forest", hasPath: false, accessible: true },
    "-3|-6": { biome: "forest", hasPath: false, accessible: true },
    "-2|-6": { biome: "forest", hasPath: false, accessible: true },
    "-1|-6": { biome: "forest", hasPath: false, accessible: true },
    "0|-6": { biome: "forest", hasPath: false, accessible: true },
    "1|-6": { biome: "forest", hasPath: false, accessible: true },
    "2|-6": { biome: "forest", hasPath: false, accessible: true },
    "3|-6": { biome: "forest", hasPath: false, accessible: true },
    "4|-6": { biome: "forest", hasPath: false, accessible: true },
    "5|-6": { biome: "forest", hasPath: false, accessible: true },
    "6|-6": { biome: "forest", hasPath: false, accessible: true },
    "7|-6": { biome: "forest", hasPath: false, accessible: true },
    "8|-6": { biome: "forest", hasPath: false, accessible: true },
    "9|-6": { biome: "forest", hasPath: false, accessible: true },
    "10|-6": { biome: "forest", hasPath: false, accessible: true },


    "-10|-5": { biome: "forest", hasPath: false, accessible: true },
    "-9|-5": { biome: "forest", hasPath: false, accessible: true },
    "-8|-5": { biome: "forest", hasPath: false, accessible: true },
    "-7|-5": { biome: "forest", hasPath: false, accessible: true },
    "-6|-5": { biome: "forest", hasPath: false, accessible: true },
    "-5|-5": { biome: "forest", hasPath: false, accessible: true },
    "-4|-5": { biome: "forest", hasPath: false, accessible: true },
    "-3|-5": { biome: "forest", hasPath: false, accessible: true },
    "-2|-5": { biome: "forest", hasPath: false, accessible: true },
    "-1|-5": { biome: "forest", hasPath: false, accessible: true },
    "0|-5": { biome: "forest", hasPath: false, accessible: true },
    "1|-5": { biome: "forest", hasPath: false, accessible: true },
    "2|-5": { biome: "forest", hasPath: false, accessible: true },
    "3|-5": { biome: "forest", hasPath: false, accessible: true },
    "4|-5": { biome: "forest", hasPath: false, accessible: true },
    "5|-5": { biome: "forest", hasPath: false, accessible: true },
    "6|-5": { biome: "forest", hasPath: false, accessible: true },
    "7|-5": { biome: "forest", hasPath: false, accessible: true },
    "8|-5": { biome: "forest", hasPath: false, accessible: true },
    "9|-5": { biome: "forest", hasPath: false, accessible: true },
    "10|-5": { biome: "forest", hasPath: false, accessible: true },


    "-10|-4": { biome: "forest", hasPath: false, accessible: true },
    "-9|-4": { biome: "forest", hasPath: false, accessible: true },
    "-8|-4": { biome: "forest", hasPath: false, accessible: true },
    "-7|-4": { biome: "forest", hasPath: false, accessible: true },
    "-6|-4": { biome: "forest", hasPath: false, accessible: true },
    "-5|-4": { biome: "forest", hasPath: false, accessible: true },
    "-4|-4": { biome: "forest", hasPath: false, accessible: true },
    "-3|-4": { biome: "forest", hasPath: false, accessible: true },
    "-2|-4": { biome: "forest", hasPath: false, accessible: true },
    "-1|-4": { biome: "forest", hasPath: false, accessible: true },
    "0|-4": { biome: "forest", hasPath: false, accessible: true },
    "1|-4": { biome: "forest", hasPath: false, accessible: true },
    "2|-4": { biome: "forest", hasPath: false, accessible: true },
    "3|-4": { biome: "forest", hasPath: false, accessible: true },
    "4|-4": { biome: "forest", hasPath: false, accessible: true },
    "5|-4": { biome: "forest", hasPath: false, accessible: true },
    "6|-4": { biome: "forest", hasPath: false, accessible: true },
    "7|-4": { biome: "forest", hasPath: false, accessible: true },
    "8|-4": { biome: "forest", hasPath: false, accessible: true },
    "9|-4": { biome: "forest", hasPath: false, accessible: true },
    "10|-4": { biome: "forest", hasPath: false, accessible: true },


    "-10|-3": { biome: "forest", hasPath: false, accessible: true },
    "-9|-3": { biome: "forest", hasPath: false, accessible: true },
    "-8|-3": { biome: "forest", hasPath: false, accessible: true },
    "-7|-3": { biome: "forest", hasPath: false, accessible: true },
    "-6|-3": { biome: "forest", hasPath: false, accessible: true },
    "-5|-3": { biome: "forest", hasPath: false, accessible: true },
    "-4|-3": { biome: "forest", hasPath: false, accessible: true },
    "-3|-3": { biome: "forest", hasPath: false, accessible: true },
    "-2|-3": { biome: "forest", hasPath: false, accessible: true },
    "-1|-3": { biome: "forest", hasPath: false, accessible: true },
    "0|-3": { biome: "forest", hasPath: false, accessible: true },
    "1|-3": { biome: "forest", hasPath: false, accessible: true },
    "2|-3": { biome: "forest", hasPath: false, accessible: true },
    "3|-3": { biome: "forest", hasPath: false, accessible: true },
    "4|-3": { biome: "forest", hasPath: false, accessible: true },
    "5|-3": { biome: "forest", hasPath: false, accessible: true },
    "6|-3": { biome: "forest", hasPath: false, accessible: true },
    "7|-3": { biome: "forest", hasPath: false, accessible: true },
    "8|-3": { biome: "forest", hasPath: false, accessible: true },
    "9|-3": { biome: "forest", hasPath: false, accessible: true },
    "10|-3": { biome: "forest", hasPath: false, accessible: true },


    "-10|-2": { biome: "forest", hasPath: false, accessible: true },
    "-9|-2": { biome: "forest", hasPath: false, accessible: true },
    "-8|-2": { biome: "forest", hasPath: false, accessible: true },
    "-7|-2": { biome: "forest", hasPath: false, accessible: true },
    "-6|-2": { biome: "forest", hasPath: false, accessible: true },
    "-5|-2": { biome: "forest", hasPath: false, accessible: true },
    "-4|-2": { biome: "forest", hasPath: false, accessible: true },
    "-3|-2": { biome: "forest", hasPath: false, accessible: true },
    "-2|-2": { biome: "forest", hasPath: false, accessible: true },
    "-1|-2": { biome: "forest", hasPath: false, accessible: true },
    "0|-2": { biome: "forest", hasPath: false, accessible: true },
    "1|-2": { biome: "forest", hasPath: false, accessible: true },
    "2|-2": { biome: "forest", hasPath: false, accessible: true },
    "3|-2": { biome: "forest", hasPath: false, accessible: true },
    "4|-2": { biome: "forest", hasPath: false, accessible: true },
    "5|-2": { biome: "forest", hasPath: false, accessible: true },
    "6|-2": { biome: "forest", hasPath: false, accessible: true },
    "7|-2": { biome: "forest", hasPath: false, accessible: true },
    "8|-2": { biome: "forest", hasPath: false, accessible: true },
    "9|-2": { biome: "forest", hasPath: false, accessible: true },
    "10|-2": { biome: "forest", hasPath: false, accessible: true },


    "-10|-1": { biome: "forest", hasPath: false, accessible: true },
    "-9|-1": { biome: "forest", hasPath: false, accessible: true },
    "-8|-1": { biome: "forest", hasPath: false, accessible: true },
    "-7|-1": { biome: "forest", hasPath: false, accessible: true },
    "-6|-1": { biome: "forest", hasPath: false, accessible: true },
    "-5|-1": { biome: "forest", hasPath: false, accessible: true },
    "-4|-1": { biome: "forest", hasPath: false, accessible: true },
    "-3|-1": { biome: "forest", hasPath: false, accessible: true },
    "-2|-1": { biome: "forest", hasPath: false, accessible: true },
    "-1|-1": { biome: "forest", hasPath: false, accessible: true },
    "0|-1": { biome: "forest", hasPath: false, accessible: true },
    "1|-1": { biome: "forest", hasPath: false, accessible: true },
    "2|-1": { biome: "forest", hasPath: false, accessible: true },
    "3|-1": { biome: "forest", hasPath: false, accessible: true },
    "4|-1": { biome: "forest", hasPath: false, accessible: true },
    "5|-1": { biome: "forest", hasPath: false, accessible: true },
    "6|-1": { biome: "forest", hasPath: false, accessible: true },
    "7|-1": { biome: "forest", hasPath: false, accessible: true },
    "8|-1": { biome: "forest", hasPath: false, accessible: true },
    "9|-1": { biome: "forest", hasPath: false, accessible: true },
    "10|-1": { biome: "forest", hasPath: false, accessible: true },


    "-10|0": { biome: "forest", hasPath: false, accessible: true },
    "-9|0": { biome: "forest", hasPath: false, accessible: true },
    "-8|0": { biome: "forest", hasPath: false, accessible: true },
    "-7|0": { biome: "forest", hasPath: true, accessible: true },
    "-6|0": { biome: "forest", hasPath: true, accessible: true },
    "-5|0": { biome: "forest", hasPath: true, accessible: true },
    "-4|0": { biome: "forest", hasPath: true, accessible: true },
    "-3|0": { biome: "forest", hasPath: true, accessible: true },
    "-2|0": { biome: "forest", hasPath: true, accessible: true },
    "-1|0": { biome: "forest", hasPath: true, accessible: true },
    "0|0": { biome: "forest", hasPath: true, accessible: true },
    "1|0": { biome: "forest", hasPath: true, accessible: true },
    "2|0": { biome: "forest", hasPath: true, accessible: true },
    "3|0": { biome: "forest", hasPath: true, accessible: true },
    "4|0": { biome: "forest", hasPath: true, accessible: true },
    "5|0": { biome: "forest", hasPath: true, accessible: true },
    "6|0": { biome: "forest", hasPath: true, accessible: true },
    "7|0": { biome: "forest", hasPath: false, accessible: true },
    "8|0": { biome: "forest", hasPath: false, accessible: true },
    "9|0": { biome: "forest", hasPath: false, accessible: true },
    "10|0": { biome: "forest", hasPath: false, accessible: true },

    "-10|1": { biome: "forest", hasPath: false, accessible: true },
    "-9|1": { biome: "forest", hasPath: false, accessible: true },
    "-8|1": { biome: "forest", hasPath: false, accessible: true },
    "-7|1": { biome: "forest", hasPath: false, accessible: true },
    "-6|1": { biome: "forest", hasPath: false, accessible: true },
    "-5|1": { biome: "forest", hasPath: false, accessible: true },
    "-4|1": { biome: "forest", hasPath: false, accessible: true },
    "-3|1": { biome: "forest", hasPath: false, accessible: true },
    "-2|1": { biome: "forest", hasPath: false, accessible: true },
    "-1|1": { biome: "forest", hasPath: false, accessible: true },
    "0|1": { biome: "forest", hasPath: false, accessible: true },
    "1|1": { biome: "forest", hasPath: false, accessible: true },
    "2|1": { biome: "forest", hasPath: false, accessible: true },
    "3|1": { biome: "forest", hasPath: false, accessible: true },
    "4|1": { biome: "forest", hasPath: false, accessible: true },
    "5|1": { biome: "forest", hasPath: false, accessible: true },
    "6|1": { biome: "forest", hasPath: false, accessible: true },
    "7|1": { biome: "forest", hasPath: false, accessible: true },
    "8|1": { biome: "forest", hasPath: false, accessible: true },
    "9|1": { biome: "forest", hasPath: false, accessible: true },
    "10|1": { biome: "forest", hasPath: false, accessible: true },

    "-10|2": { biome: "forest", hasPath: false, accessible: true },
    "-9|2": { biome: "forest", hasPath: false, accessible: true },
    "-8|2": { biome: "forest", hasPath: false, accessible: true },
    "-7|2": { biome: "forest", hasPath: false, accessible: true },
    "-6|2": { biome: "forest", hasPath: false, accessible: true },
    "-5|2": { biome: "forest", hasPath: false, accessible: true },
    "-4|2": { biome: "forest", hasPath: false, accessible: true },
    "-3|2": { biome: "forest", hasPath: false, accessible: true },
    "-2|2": { biome: "forest", hasPath: false, accessible: true },
    "-1|2": { biome: "forest", hasPath: false, accessible: true },
    "0|2": { biome: "forest", hasPath: false, accessible: true },
    "1|2": { biome: "forest", hasPath: false, accessible: true },
    "2|2": { biome: "forest", hasPath: false, accessible: true },
    "3|2": { biome: "forest", hasPath: false, accessible: true },
    "4|2": { biome: "forest", hasPath: false, accessible: true },
    "5|2": { biome: "forest", hasPath: false, accessible: true },
    "6|2": { biome: "forest", hasPath: false, accessible: true },
    "7|2": { biome: "forest", hasPath: false, accessible: true },
    "8|2": { biome: "forest", hasPath: false, accessible: true },
    "9|2": { biome: "forest", hasPath: false, accessible: true },
    "10|2": { biome: "forest", hasPath: false, accessible: true },

    "-10|3": { biome: "forest", hasPath: false, accessible: true },
    "-9|3": { biome: "forest", hasPath: false, accessible: true },
    "-8|3": { biome: "forest", hasPath: false, accessible: true },
    "-7|3": { biome: "forest", hasPath: false, accessible: true },
    "-6|3": { biome: "forest", hasPath: false, accessible: true },
    "-5|3": { biome: "forest", hasPath: false, accessible: true },
    "-4|3": { biome: "forest", hasPath: false, accessible: true },
    "-3|3": { biome: "forest", hasPath: false, accessible: true },
    "-2|3": { biome: "forest", hasPath: false, accessible: true },
    "-1|3": { biome: "forest", hasPath: false, accessible: true },
    "0|3": { biome: "forest", hasPath: false, accessible: true },
    "1|3": { biome: "forest", hasPath: false, accessible: true },
    "2|3": { biome: "forest", hasPath: false, accessible: true },
    "3|3": { biome: "forest", hasPath: false, accessible: true },
    "4|3": { biome: "forest", hasPath: false, accessible: true },
    "5|3": { biome: "forest", hasPath: false, accessible: true },
    "6|3": { biome: "forest", hasPath: false, accessible: true },
    "7|3": { biome: "forest", hasPath: false, accessible: true },
    "8|3": { biome: "forest", hasPath: false, accessible: true },
    "9|3": { biome: "forest", hasPath: false, accessible: true },
    "10|3": { biome: "forest", hasPath: false, accessible: true },

    "-10|4": { biome: "forest", hasPath: false, accessible: true },
    "-9|4": { biome: "forest", hasPath: false, accessible: true },
    "-8|4": { biome: "forest", hasPath: false, accessible: true },
    "-7|4": { biome: "forest", hasPath: false, accessible: true },
    "-6|4": { biome: "forest", hasPath: false, accessible: true },
    "-5|4": { biome: "forest", hasPath: false, accessible: true },
    "-4|4": { biome: "forest", hasPath: false, accessible: true },
    "-3|4": { biome: "forest", hasPath: false, accessible: true },
    "-2|4": { biome: "forest", hasPath: false, accessible: true },
    "-1|4": { biome: "forest", hasPath: false, accessible: true },
    "0|4": { biome: "forest", hasPath: false, accessible: true },
    "1|4": { biome: "forest", hasPath: false, accessible: true },
    "2|4": { biome: "forest", hasPath: false, accessible: true },
    "3|4": { biome: "forest", hasPath: false, accessible: true },
    "4|4": { biome: "forest", hasPath: false, accessible: true },
    "5|4": { biome: "forest", hasPath: false, accessible: true },
    "6|4": { biome: "forest", hasPath: false, accessible: true },
    "7|4": { biome: "forest", hasPath: false, accessible: true },
    "8|4": { biome: "forest", hasPath: false, accessible: true },
    "9|4": { biome: "forest", hasPath: false, accessible: true },
    "10|4": { biome: "forest", hasPath: false, accessible: true },

    "-10|5": { biome: "forest", hasPath: false, accessible: true },
    "-9|5": { biome: "forest", hasPath: false, accessible: true },
    "-8|5": { biome: "forest", hasPath: false, accessible: true },
    "-7|5": { biome: "forest", hasPath: false, accessible: true },
    "-6|5": { biome: "forest", hasPath: false, accessible: true, town: true },
    "-5|5": { biome: "forest", hasPath: false, accessible: true },
    "-4|5": { biome: "forest", hasPath: false, accessible: true },
    "-3|5": { biome: "forest", hasPath: false, accessible: true },
    "-2|5": { biome: "forest", hasPath: false, accessible: true },
    "-1|5": { biome: "forest", hasPath: false, accessible: true },
    "0|5": { biome: "forest", hasPath: false, accessible: true },
    "1|5": { biome: "forest", hasPath: false, accessible: true },
    "2|5": { biome: "forest", hasPath: false, accessible: true },
    "3|5": { biome: "forest", hasPath: false, accessible: true },
    "4|5": { biome: "forest", hasPath: false, accessible: true },
    "5|5": { biome: "forest", hasPath: false, accessible: true },
    "6|5": { biome: "forest", hasPath: false, accessible: true },
    "7|5": { biome: "forest", hasPath: false, accessible: true },
    "8|5": { biome: "forest", hasPath: false, accessible: true },
    "9|5": { biome: "forest", hasPath: false, accessible: true },
    "10|5": { biome: "forest", hasPath: false, accessible: true },

    "-10|6": { biome: "forest", hasPath: false, accessible: true },
    "-9|6": { biome: "forest", hasPath: false, accessible: true },
    "-8|6": { biome: "forest", hasPath: false, accessible: true },
    "-7|6": { biome: "forest", hasPath: false, accessible: true },
    "-6|6": { biome: "forest", hasPath: false, accessible: true },
    "-5|6": { biome: "forest", hasPath: false, accessible: true },
    "-4|6": { biome: "forest", hasPath: false, accessible: true },
    "-3|6": { biome: "forest", hasPath: false, accessible: true },
    "-2|6": { biome: "forest", hasPath: false, accessible: true },
    "-1|6": { biome: "forest", hasPath: false, accessible: true },
    "0|6": { biome: "forest", hasPath: false, accessible: true },
    "1|6": { biome: "forest", hasPath: false, accessible: true },
    "2|6": { biome: "forest", hasPath: false, accessible: true },
    "3|6": { biome: "forest", hasPath: false, accessible: true },
    "4|6": { biome: "forest", hasPath: false, accessible: true },
    "5|6": { biome: "forest", hasPath: false, accessible: true },
    "6|6": { biome: "lake", hasPath: false, accessible: false },
    "7|6": { biome: "lake", hasPath: false, accessible: false },
    "8|6": { biome: "lake", hasPath: false, accessible: false },
    "9|6": { biome: "forest", hasPath: false, accessible: true },
    "10|6": { biome: "forest", hasPath: false, accessible: true },

    "-10|7": { biome: "forest", hasPath: false, accessible: true },
    "-9|7": { biome: "forest", hasPath: false, accessible: true },
    "-8|7": { biome: "forest", hasPath: false, accessible: true },
    "-7|7": { biome: "forest", hasPath: false, accessible: true },
    "-6|7": { biome: "forest", hasPath: false, accessible: true },
    "-5|7": { biome: "forest", hasPath: false, accessible: true },
    "-4|7": { biome: "forest", hasPath: false, accessible: true },
    "-3|7": { biome: "forest", hasPath: false, accessible: true },
    "-2|7": { biome: "forest", hasPath: false, accessible: true },
    "-1|7": { biome: "forest", hasPath: false, accessible: true },
    "0|7": { biome: "forest", hasPath: false, accessible: true },
    "1|7": { biome: "forest", hasPath: false, accessible: true },
    "2|7": { biome: "forest", hasPath: false, accessible: true },
    "3|7": { biome: "forest", hasPath: false, accessible: true },
    "4|7": { biome: "lake", hasPath: false, accessible: false },
    "5|7": { biome: "lake", hasPath: false, accessible: false },
    "6|7": { biome: "lake", hasPath: false, accessible: false },
    "7|7": { biome: "lake", hasPath: false, accessible: false },
    "8|7": { biome: "lake", hasPath: false, accessible: false },
    "9|7": { biome: "forest", hasPath: false, accessible: true },
    "10|7": { biome: "forest", hasPath: false, accessible: true },

    "-10|8": { biome: "forest", hasPath: false, accessible: true },
    "-9|8": { biome: "forest", hasPath: false, accessible: true },
    "-8|8": { biome: "forest", hasPath: false, accessible: true },
    "-7|8": { biome: "forest", hasPath: false, accessible: true },
    "-6|8": { biome: "forest", hasPath: false, accessible: true },
    "-5|8": { biome: "forest", hasPath: false, accessible: true },
    "-4|8": { biome: "forest", hasPath: false, accessible: true },
    "-3|8": { biome: "forest", hasPath: false, accessible: true },
    "-2|8": { biome: "forest", hasPath: false, accessible: true },
    "-1|8": { biome: "forest", hasPath: false, accessible: true },
    "0|8": { biome: "forest", hasPath: false, accessible: true },
    "1|8": { biome: "forest", hasPath: false, accessible: true },
    "2|8": { biome: "forest", hasPath: false, accessible: true },
    "3|8": { biome: "forest", hasPath: false, accessible: true },
    "4|8": { biome: "forest", hasPath: false, accessible: true },
    "5|8": { biome: "lake", hasPath: false, accessible: false },
    "6|8": { biome: "lake", hasPath: false, accessible: false },
    "7|8": { biome: "lake", hasPath: false, accessible: false },
    "8|8": { biome: "lake", hasPath: false, accessible: false },
    "9|8": { biome: "forest", hasPath: false, accessible: true },
    "10|8": { biome: "forest", hasPath: false, accessible: true },

    "-10|9": { biome: "forest", hasPath: false, accessible: true },
    "-9|9": { biome: "forest", hasPath: false, accessible: true },
    "-8|9": { biome: "forest", hasPath: false, accessible: true },
    "-7|9": { biome: "forest", hasPath: false, accessible: true },
    "-6|9": { biome: "forest", hasPath: false, accessible: true },
    "-5|9": { biome: "forest", hasPath: false, accessible: true },
    "-4|9": { biome: "forest", hasPath: false, accessible: true },
    "-3|9": { biome: "forest", hasPath: false, accessible: true },
    "-2|9": { biome: "forest", hasPath: false, accessible: true },
    "-1|9": { biome: "forest", hasPath: false, accessible: true },
    "0|9": { biome: "forest", hasPath: false, accessible: true },
    "1|9": { biome: "forest", hasPath: false, accessible: true },
    "2|9": { biome: "forest", hasPath: false, accessible: true },
    "3|9": { biome: "forest", hasPath: false, accessible: true },
    "4|9": { biome: "forest", hasPath: false, accessible: true },
    "5|9": { biome: "forest", hasPath: false, accessible: true },
    "6|9": { biome: "lake", hasPath: false, accessible: false },
    "7|9": { biome: "lake", hasPath: false, accessible: false },
    "8|9": { biome: "forest", hasPath: false, accessible: true },
    "9|9": { biome: "forest", hasPath: false, accessible: true },
    "10|9": { biome: "forest", hasPath: false, accessible: true },

    "-10|10": { biome: "forest", hasPath: false, accessible: true },
    "-9|10": { biome: "forest", hasPath: false, accessible: true },
    "-8|10": { biome: "forest", hasPath: false, accessible: true },
    "-7|10": { biome: "forest", hasPath: false, accessible: true },
    "-6|10": { biome: "forest", hasPath: false, accessible: true },
    "-5|10": { biome: "forest", hasPath: false, accessible: true },
    "-4|10": { biome: "forest", hasPath: false, accessible: true },
    "-3|10": { biome: "forest", hasPath: false, accessible: true },
    "-2|10": { biome: "forest", hasPath: false, accessible: true },
    "-1|10": { biome: "forest", hasPath: false, accessible: true },
    "0|10": { biome: "forest", hasPath: false, accessible: true },
    "1|10": { biome: "forest", hasPath: false, accessible: true },
    "2|10": { biome: "forest", hasPath: false, accessible: true },
    "3|10": { biome: "forest", hasPath: false, accessible: true },
    "4|10": { biome: "forest", hasPath: false, accessible: true },
    "5|10": { biome: "forest", hasPath: false, accessible: true },
    "6|10": { biome: "forest", hasPath: false, accessible: true },
    "7|10": { biome: "forest", hasPath: false, accessible: true },
    "8|10": { biome: "forest", hasPath: false, accessible: true },
    "9|10": { biome: "forest", hasPath: false, accessible: true },
    "10|10": { biome: "forest", hasPath: false, accessible: true },


};

//Parse map






var map = [], loc,
    ri = 0,
    width = jsonmap.width,
    height = jsonmap.height;

for (var r = 0; r < height; r++) {
    map.push([]);

    for (var c = 0; c < width; c++) {
        loc = {
            biome: Locations.biomes[jsonmap.layers[0].data[c+r*width]-1],
            loc: c + "|" + r,
        };

        if (loc.biome === "highmountain" || loc.biome === "water") {
            loc.accessible = false;
        }

        map[ri].push(loc);
    };
    ri++;
};

Locations.asMap = map;
*/



Locations.biomes = [
    "sand",
    "forest",
    "grass",
    "water",
    "mountain",
    "snow",
    "pass",
    "bridge",
    "cave",
    "village",
    "tallmountain",
    "city",
];

Locations.cities = {
    "63|51": {
        name: "Caldum"
    }
}

Locations.get = function (l) {
    var row = +l.split("|")[0];
    var col = +l.split("|")[1];
    var width = jsonmap.width,
        height = jsonmap.height;
    var loc = {
        biome: Locations.biomes[jsonmap.layers[0].data[row+col*width]-1],
        loc: l,
        accessible: true,
    };
    if (loc.biome === "tallmountain" || loc.biome === "water") {
        loc.accessible = false;
    }
    return loc;
}


constructDirection = function (dir) {
    var loc = Meteor.user().location,
        locTo, locToInfo;
    console.log(dir)
    if (dir === "west") {
        locTo = (+loc.split("|")[0] -1) + "|" + (+loc.split("|")[1]);
    } else if (dir === "east") {
        locTo = (+loc.split("|")[0] +1) + "|" + (+loc.split("|")[1]);
    } else if (dir === "north") {
        locTo = (+loc.split("|")[0] ) + "|" + (+loc.split("|")[1]-1);
    } else if (dir === "south") {
        locTo = (+loc.split("|")[0]) + "|" + (+loc.split("|")[1]+1);
    }
    console.log("loc to", locTo)
    var locToInfo = Locations.get(locTo),
        info = "";
    console.log("locinfo", locToInfo)
    if (locToInfo) {
        if (locToInfo.hasPath) {
            info += "Follow the path";
        } else {
            info += "Walk ";
        }

        info += " into the " + locToInfo.biome;
        info += " "+dir+"ward";

    }

    return info;
};