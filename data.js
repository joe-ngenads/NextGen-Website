const rawCsvData = `Identifier,Region,County,City,Annual Impressions,Monthly Rate,Address,Lat,Lon
56,2,Harrison,Cadiz,40881,$27.25 ,"538 N Main St Suite D, Cadiz, Ohio, 43907",40.289744,-80.9841896
94,2,Morgan,McConnelsville,42374,$28.25 ,"4676 N State Route 60 NW, McConnelsville, Ohio, 43756",39.670449,-81.87229
97,2,Noble,Caldwell,45770,$30.51 ,"401 West Street, Caldwell, Ohio, 43724",39.747018,-81.516894
87,2,Monroe,Woodsfield,51163,$34.11 ,"201 Oaklawn Ave, Woodsfield, Ohio, 43793",39.765109,-81.116119
99,4,Paulding,Paulding,51231,$34.15 ,"831 N Williams St, Paulding, Ohio, 45879",41.147566,-84.580274
135,1,Wayne,Orrville,53909,$35.94 ,"1430 W High St Ste 3, Orrville, Ohio, 44667",40.844007,-81.781149
84,2,Meigs,Pomeroy,57538,$38.36 ,"354 E Main St, Pomeroy, Ohio, 45769",39.02957,-82.02636
127,1,Tuscarawas,Uhrichsville,59353,$39.57 ,"206 E 3rd St Uhrichsville, Ohio, 44683",40.391274,-81.343492
1,1,Carroll,Carrollton,62309,$41.54 ,"155 W Main St, Carrollton, Ohio, 44615",40.573378,-81.087491
12,4,Crawford,Bucyrus,64199,$42.80 ,"1653 Marion Rd, Bucyrus, Ohio, 44820",40.789386,-82.987666
57,4,Henry,Napoleon,64218,$42.81 ,"211 W Front St, Napoleon, Ohio, 43545",41.387887,-84.124903
105,4,Putnam,Ottawa,65297,$43.53 ,"275 N Hickory St, Ottawa, Ohio, 45875",41.021109,-84.045947
95,4,Morrow,Mount Gilead,68282,$45.52 ,"15 E High St, Mount Gilead, Ohio, 43338",40.549023,-82.827894
98,4,Ottawa,Port Clinton,78416,$52.28 ,"220 Madison St, Port Clinton, Ohio, 43452",41.511037,-82.941249
147,2,Belmont,Barnesville,78445,$52.30 ,"130 W Main St, Barnesville, Ohio, 43713",39.987852,-81.178107
2,4,Clark,New Carlisle,79592,$53.06 ,"430 N Main St Suite 1, New Carlisle, Ohio, 45344",39.943428,-84.023789
139,3,Adams,West Union,87192,$58.13 ,"33 logans Ln, West Union, Ohio, 45693",38.797236,-83.543099
8,3,Clinton,Wilmington,87604,$58.40 ,"1850 Davids Drive STE 110, Wilmington, Ohio, 45177",39.41821,-83.819662
123,1,Trumbull,Warren,88615,$59.08 ,"2027 Elm Rd NE, Warren, Ohio, 44483",41.254786,-80.794181
65,2,Lawrence,Proctorville,89893,$59.93 ,"402 Trent St, Proctorville, Ohio, 45669",38.49585,-82.364902
58,3,Highland,Hillsboro,93572,$62.38 ,"1575 High Street, Suite 500, Hillsboro, Ohio, 45133",39.238035,-83.609601
79,4,Madison,London,93628,$62.42 ,"13 N Oak St, London, Ohio, 43140",39.886061,-83.450304
141,4,Allen,Lima (Eastgate),94993,$63.33 ,"2302 Harding Hwy, Lima, Ohio, 45804",40.729674,-84.063197
9,1,Columbiana,Salem,95637,$63.76 ,"200 E 2nd St Ste B, Salem, Ohio, 44460",40.902393,-80.855456
44,3,Greene,Fairborn,99676,$66.45 ,"1274 N Broad St, Fairborn, Ohio, 45324",39.83359,-84.01251
143,1,Ashtabula,Ashtabula,100030,$66.69 ,"858 Lake Ave, Ashtabula, Ohio, 44004",41.892589,-80.804575
46,3,Hamilton,Montgomery,100317,$66.88 ,"9997 Montgomery Rd, Montgomery, Ohio, 45242",39.23902,-84.350038
42,3,Greene,Beavercreek,101753,$67.84 ,"1221 Meadow Bridge Dr, Beavercreek, Ohio, 45434",39.724809,-84.052758
129,4,Van Wert,Van Wert,102268,$68.18 ,"777 Fox Rd, Van Wert, Ohio, 45891",40.851448,-84.597195
70,4,Logan,Bellefontaine,103422,$68.95 ,"1365 County Road 32 N Suite 3, Bellefontaine, Ohio, 43311",40.373994,-83.791076
85,4,Mercer,Celina,103603,$69.07 ,"320 Portland St, Celina, Ohio, 45822",40.546623,-84.584517
117,1,Summit,Fairlawn,106037,$70.69 ,"2955 W Market St Ste L, Fairlawn, Ohio, 44333",41.128416,-81.608981
148,3,Brown,Georgetown,106465,$70.98 ,"924 S Main St, Georgetown, Ohio, 45121",38.854691,-83.898112
41,1,Geauga,Chardon,107158,$71.44 ,"12611 Ravenwood Dr Ste 120, Chardon, Ohio, 44024",41.507902,-81.18553
67,2,Licking,Johnstown,107763,$71.84 ,"701 W Coshocton Rd, Johnstown, Ohio, 43031",40.145769,-82.701329
131,3,Warren,Franklin,109583,$73.06 ,"245 S Main Street, Suite B, Franklin, Ohio, 45005",39.561514,-84.302761
134,1,Wayne,Wooster,115133,$76.76 ,"200 Vanover St Ste 3, Wooster, Ohio, 44691",40.796395,-81.948283
72,1,Lorain,Wellington,117694,$78.46 ,"805 Patriot Dr Ste D, Wellington, Ohio, 44090",41.182009,-82.219786
40,4,Fulton,Wauseon,117980,$78.65 ,"152 S Fulton St Ste 105, Wauseon, Ohio, 43567",41.546367,-84.141305
24,4,Defiance,Defiance,118135,$78.76 ,"999 Procom Dr Ste 103, Defiance, Ohio, 43512",41.277042,-84.394666
107,4,Richland,Shelby,118753,$79.17 ,"159 Mansfield Ave, Shelby, Ohio, 44875",40.870483,-82.645895
102,3,Pike,Waverly,123450,$82.30 ,"230 Waverly Plz Ste 1200, Waverly, Ohio, 45690",39.1322,-82.97677
112,4,Shelby,Sidney,124834,$83.22 ,"1000 Milligan Ct, Suite 100, Sidney, Ohio, 45365",40.300199,-84.139294
101,2,Pickaway,Circleville,125676,$83.78 ,"141 West Main St, Suite 200, Circleville, Ohio, 43113",39.602228,-82.946714
103,1,Portage,Streetsboro,125896,$83.93 ,"9350 Market Square, Streetsboro, Ohio, 44241",41.245655,-81.346938
145,4,Auglaize,Wapakoneta,126251,$84.17 ,"604 S Blackhoof St, Wapakoneta, Ohio, 45895",40.564646,-84.196329
83,1,Medina,Wadsworth,126959,$84.64 ,"123 Broad St Ste A, Wadsworth, Ohio, 44281",41.025212,-81.728762
6,3,Clermont,Loveland,130971,$87.31 ,"543 Loveland Madeira Rd, Loveland, Ohio, 45140",39.26386,-84.267842
17,1,Cuyahoga,Independence,131042,$87.36 ,"6901 Rockside Rd Ste 17, Independence, Ohio, 44131",41.396302,-81.641616
137,4,Wood,Perrysburg,131625,$87.75 ,"26611 Dixie Hwy Suite 125, Perrysburg, Ohio, 43551",41.540549,-83.634788
27,3,Fayette,Washington CH,134885,$89.92 ,"103 E East St, Washington Courthouse, Ohio 43160",39.534945,-83.438575
52,3,Hamilton,Harrison,134950,$89.97 ,"10553B Harrison Ave, Harrison, Ohio, 45030",39.251504,-84.795233
114,1,Stark,Alliance,135310,$90.21 ,"513 E Main St, Alliance, Ohio, 44601",40.921616,-81.098199
73,1,Lorain,Avon Lake,136854,$91.24 ,"32848 Walker Rd, Avon Lake, Ohio, 44012",41.495094,-82.022003
23,3,Darke,Greenville,138149,$92.10 ,"641 Wagner Ave Ste A, Greenville, Ohio 45331",40.118395,-84.621767
54,3,Hamilton,Cincinnati (Price Hill),140154,$93.44 ,"3461 Warsaw Ave, Cincinnati, 45205",39.110182,-84.568177
45,2,Guernsey,Cambridge,141728,$94.49 ,"405 Wheeling Ave, Cambridge, Ohio, 43725",40.025438,-81.59645
62,2,Knox,Mount Vernon,141887,$94.59 ,"671 N Sandusky St, Mount Vernon, Ohio, 43050",40.406874,-82.493514
66,2,Lawrence,Ironton,141923,$94.62 ,"2717 S 3rd St Suite A, Ironton, Ohio, 45638",38.511995,-82.666
104,3,Preble,Eaton,144349,$96.23 ,"500 N Barron St, Eaton, Ohio, 45320",39.749094,-84.63611
128,4,Union,Marysville,145078,$96.72 ,"940 London Ave, Suite 1200, Marysville, Ohio, 43040",40.224334,-83.369501
10,1,Columbiana,Lisbon,146129,$97.42 ,"7785 State Rt 45 Unit A, Lisbon, Ohio, 44432",40.788088,-80.776282
91,3,Montgomery,Downtown Dayton,150230,$100.15 ,"451 West 3rd Street, Dayton, Ohio, 45422",39.758664,-84.200513
146,2,Belmont,Bridgeport,151265,$100.84 ,"318 Howard St, Bridgeport, Ohio, 43912",40.070121,-80.74345
53,3,Hamilton,Cincinnati (Red Bank),151977,$101.32 ,"3372 Red Bank Rd, Cincinnati, Ohio, 45227",39.136997,-84.401703
152,3,Butler,Hamilton West,152102,$101.40 ,"744 NW Washington Blvd Ste B, Hamilton, Ohio, 45013",39.428462,-84.59546
136,4,Williams,Bryan,152605,$101.74 ,"13065 County Road D50, Suite C, Bryan, Ohio, 43506",41.477983,-84.572938
132,3,Warren,Lebanon,154386,$102.92 ,"19 Dave Dr # B, Lebanon, Ohio, 45036",39.433434,-84.193747
16,1,Cuyahoga,Shaker Hts,154890,$103.26 ,"16945 Chagrin Blvd, Shaker Hts, Ohio, 44120",41.465127,-81.560712
116,1,Stark,North Canton,154976,$103.32 ,"3187 Whitewood ST NW, North Canton, Ohio, 44720",40.905598,-81.404071
60,4,Huron,Norwalk,155738,$103.83 ,"305 Shady Lane, Norwalk, Ohio, 44857",41.223524,-82.610577
142,1,Ashtabula,Jefferson,161558,$107.71 ,"4 W Walnut St, Jefferson, Ohio, 44047",41.740289,-80.769744
18,1,Cuyahoga,Cleveland (Mid-Town),162618,$108.41 ,"8039 Euclid Ave, Cleveland, Ohio, 44103",41.503981,-81.632783
133,2,Washington,Marietta,162914,$108.61 ,"142 Gross St Suite B, Marietta, Ohio, 45750",39.423073,-81.44805
51,3,Hamilton,Cleves,164494,$109.66 ,"204 E 2nd St, Cleves, Ohio, 45002",39.162479,-84.749076
86,1,Miami,Troy,168639,$112.43 ,"1070 West Main Street, Troy, Ohio, 45373",40.04185,-84.222073
43,3,Greene,Xenia,169916,$113.28 ,"601 Ledbetter Rd Apt D, Xenia, Ohio, 45385",39.666513,-83.944095
151,3,Butler,Middletown,173506,$115.67 ,"3232 Roosevelt Blvd, Middletown, Ohio 45044",39.500176,-84.372126
125,1,Trumbull,Niles,182030,$121.35 ,"5555 Youngstown Warren Rd 202, Niles, Ohio, 44446",41.211242,-80.746852
138,4,Wood,Bowling Green,184288,$122.86 ,"1616 E Wooster St Suite 30, Bowling Green, Ohio, 43402",41.373307,-83.623198
108,3,Ross,Chillicothe,192799,$128.53 ,"475 Western Ave, Ste N, Chillicothe, Ohio, 45601",39.335907,-83.003032
26,4,Erie,Sandusky,193531,$129.02 ,"1050 Cleveland Rd, Sandusky, Ohio, 44870",41.444535,-82.696291
7,3,Clermont,Milford,199827,$133.22 ,"1007 Lila Ave, Milford, Ohio, 45150",39.174126,-84.275754
47,3,Hamilton,Seven Hills,202156,$134.77 ,"10948 Hamilton Ave, Seven Hills, Ohio, 45231",39.276504,-84.562985
118,1,Summit,Akron (Ellet),203148,$135.43 ,"2420 Wedgewood Dr Ste 8, Akron, Ohio, 44312",41.048247,-81.442276
19,1,Cuyahoga,Cleveland (Westpark),210886,$140.59 ,"3345 Edgecliff Terrace, Cleveland, Ohio, 44111",41.462394,-81.802446
113,1,Stark,Canton (Cleveland Ave),212089,$141.39 ,"3029 Cleveland Ave SW, Canton, Ohio, 44707",40.764054,-81.383811
31,2,Franklin,Columbus (Westpointe),212171,$141.45 ,"5332 Westpointe Plaza Dr, Columbus, Ohio, 43228",39.984976,-83.146691
109,4,Sandusky,Fremont,213713,$142.48 ,"500 W State St, Suite C, Fremont, Ohio, 43420",41.348605,-83.115507
110,2,Scioto,Portsmouth,216308,$144.21 ,"843 11th St, Portsmouth, Ohio, 45662",38.73947,-82.994662
122,1,Summit,Akron (Tallmadge),220491,$146.99 ,"1030 E Tallmadge Ave Ste 4, Akron, Ohio, 44310",41.100255,-81.477843
149,3,Butler,Fairfield,220491,$146.99 ,"530 Wessel Drive Suite L, Fairfield, Ohio, 45014",39.334881,-84.563532
34,2,Franklin,Grove City,221690,$147.79 ,"3040 Southwest Blvd, Grove City, Ohio, 43123",39.891516,-83.082658
22,1,Cuyahoga,Brooklyn,223088,$148.73 ,"7000 Biddulph Rd, Brooklyn, Ohio, 44144",41.431068,-81.733961
15,1,Cuyahoga,North Olmsted,225698,$150.47 ,"26642 Brookpark Rd, North Olmsted, Ohio, 44070",41.419902,-81.919486
39,2,Franklin,Columbus (Worthington),229862,$153.24 ,"112 Dillmont Dr, Columbus, Ohio, 43235",40.134282,-83.013492
96,2,Muskingum,Zanesville,230755,$153.84 ,"2328 June Pkwy, Zanesville, Ohio, 43701",39.906702,-82.01685
81,1,Mahoning,Youngstown (Gypsy),233114,$155.41 ,"667 Gypsy Ln Unit B, Youngstown, Ohio, 44505",41.132716,-80.664031
150,3,Butler,Hamilton East,234793,$156.53 ,"1720 S Erie Hwy Ste A, Hamilton, Ohio, 45011",39.379467,-84.54995
77,4,Lucas,Toledo (W Sylvania),235935,$157.29 ,"3606 W Sylvania Ave, Suite 15, Toledo, Ohio, 43623",41.692588,-83.630758
4,4,Clark,Springfield (Sunset)(South),237133,$158.09 ,"1221 Sunset Ave, Springfield, Ohio, 45505",39.903824,-83.792581
37,2,Franklin,Columbus (S High),239966,$159.98 ,"3833 S High St, Columbus, Ohio, 43207",39.884223,-83.003027
92,3,Montgomery,East Dayton,244810,$163.21 ,"1036 S Smithville Rd, Dayton, Ohio, 45403",39.753286,-84.139106
3,4,Clark,Springfield (Bechtle)(North),245138,$163.43 ,"1109 N Bechtle Ave, Springfield, Ohio, 45504",39.93912,-83.837024
93,3,Montgomery,Centerville,247256,$164.84 ,"104 W Spring Valley Pike, Centerville, Ohio, 45458",39.612526,-84.162798
82,4,Marion,Marion,249440,$166.29 ,"222 W Center St Room 1123, Marion, Ohio, 43302",40.588636,-83.132515
25,2,Delaware,Delaware,250124,$166.75 ,"2079 US Highway 23 N Suite 2, Delaware, Ohio, 43015",40.329043,-83.07507
71,1,Lorain,Elyria,253282,$168.85 ,"605 Chestnut Commons Dr, Elyria, Ohio, 44035",41.346441,-82.065742
89,3,Montgomery,Clayton / Englewood,254428,$169.62 ,"8389 N Main Street, Dayton, Ohio, 45415",39.846613,-84.267921
140,4,Allen,Lima (Downtown),256436,$170.96 ,"419 N Elizabeth St Ste B, Lima, Ohio, 45801",40.744807,-84.106791
20,1,Cuyahoga,Cleveland (Downtown),262459,$174.97 ,"2765 E 55th St, Unit 4, Cleveland, Ohio, 44104",41.483634,-81.651537
130,3,Warren,Mason,262659,$175.11 ,"775 Reading Rd, Mason, Ohio, 45040",39.348002,-84.327727
88,3,Montgomery,Moraine,265030,$176.69 ,"5582 N Springboro Pike, Moraine, Ohio, 45439",39.677386,-84.220222
48,3,Hamilton,Norwood,272485,$181.66 ,"4566 Montgomery Rd, Norwood, Ohio 45212",39.159491,-84.455113
50,3,Hamilton,Cincinnati (Colerain),276770,$184.51 ,"3218 West Galbraith Rd, Cincinnati, Ohio, 45239",39.22073,-84.588049
49,3,Hamilton,Sharonville,277459,$184.97 ,"11177 Reading Rd #203, Cincinnati, Ohio 45241",39.273,-84.412199
106,4,Richland,Mansfield,278522,$185.68 ,"15-17 E Temple Ct, Mansfield, Ohio, 44902",40.761579,-82.514905
121,1,Summit,Northfield,286213,$190.81 ,"10333 Northfield Rd Ste 156A, Northfield, Ohio, 44067",41.340227,-81.528673
80,1,Mahoning,Boardman,288436,$192.29 ,"233 Boardman-Canfield Rd, Boardman, Ohio, 44512",41.023778,-80.670258
55,4,Hancock,Findlay,288754,$192.50 ,"8210 County Rd 140, Suite A, Findlay, Ohio 45840",41.047853,-83.689679
14,1,Cuyahoga,Parma,301773,$201.18 ,"12000 Snow Rd, Ste 12, Parma, Ohio, 44130",41.405449,-81.770533
90,3,Montgomery,Huber Heights,303494,$202.33 ,"6134 Chambersburg Road, Dayton, Ohio, 45424",39.845852,-84.118355
76,4,Lucas,Toledo (Heatherdowns),307635,$205.09 ,"4460 Heatherdowns Blvd, Toledo, Ohio, 43614",41.595405,-83.647434
5,3,Clermont,Batavia,330211,$220.14 ,"457 W Main St, Batavia, Ohio, 45103",39.080705,-84.185257
74,1,Lorain,Lorain,382292,$254.86 ,"4340 Leavitt Rd Unit K, Lorain, Ohio, 44053",41.428036,-82.205671
115,1,Stark,Canton (Whipple),420088,$280.06 ,"2812 Whipple Ave NW, Canton, Ohio, 44708",40.829428,-81.423974
32,2,Franklin,Whitehall (East Broad),424237,$282.82 ,"3481 E Broad St, Whitehall, Ohio, 43213",39.972249,-82.908185
38,2,Franklin,Columbus (W Broad),428967,$285.98 ,"4161 W Broad St, Columbus, Ohio, 43228",39.952007,-83.112596
36,2,Franklin,Hilliard,435312,$290.21 ,"4740 Cemetery Rd, Hilliard, Ohio, 43026",40.033057,-83.143185
69,2,Licking,Newark,437652,$291.77 ,"875 E Main St, Newark, Ohio, 43055",40.060482,-82.367217
30,2,Franklin,Columbus (Kenny Rd),487620,$325.08 ,"4503 Kenny Rd, Columbus, Ohio, 43220",40.050501,-83.050599
28,2,Franklin,Westerville,504327,$336.22 ,"562 W Schrock Rd, Westerville, Ohio, 43081",40.111455,-82.945686
29,2,Franklin,Columbus (Alum Creek),713207,$400.00 ,"1583 Alum Creek Dr, Columbus, Ohio, 43209",39.937649,-82.943133
33,2,Franklin,Columbus (Morse Rd),1080099,$400.00 ,"990 Morse Rd Suite A, Columbus, Ohio, 43229",40.062425,-82.992441
11,2,Coshocton,Coshocton,,,"275 Downtowner Plaza, Coshocton, Ohio, 43812",40.269562,-81.869212
13,1,Cuyahoga,North Royalton,,,"12771 State Rd, North Royalton, Ohio, 44133",41.3211,-81.723463
21,1,Cuyahoga,Parma Hts,, ,"6339 Olde York Rd Ste 1, Parma Hts, Ohio, 44130",41.391474,-81.759292
35,2,Franklin,Gahanna,,,"415 Agler Rd, Gahanna, Ohio, 43230",40.019025,-82.892511
59,1,Holmes,Millersburg,,,"75 E Clinton St Ste 103, Millersburg, Ohio, 44654",40.555369,-81.916372
61,2,Jefferson,Steubenville,,,"4244 Sunset Blvd Suite D, Steubenville, Ohio, 43952",40.373835,-80.678847
63,1,Lake,Wickliffe,,,"30170 Euclid Ave, Wickliffe, Ohio, 44092",41.615451,-81.459645
64,1,Lake,Willowick,,,"31517 Vine St, Willowick, Ohio, 44095",41.642736,-81.466244
68,2,Licking,Pataskala,,,"318 Township Rd, Pataskala, Ohio, 43062",39.996724,-82.672662
75,4,Lucas,Oregon,,,"3018 Navarre Ave, Oregon, Ohio, 43616",41.635415,-83.474866
78,4,Lucas,Sylvania,,,"4900 N Mccord Rd Suite F1, Sylvania, Ohio, 43560",41.704629,-83.703273
100,2,Perry,New Lexington,,,"600 W Broadway St, New Lexington, Ohio, 43764",39.721024,-82.221532
111,4,Seneca,Tiffin,,,"457 E Market St, Tiffin, Ohio, 44883",41.118595,-83.166283
119,1,Summit,Akron (Wolf Ledges),,,"688 Wolf Ledges Pkwy, Akron, Ohio, 44311",41.065031,-81.521113
120,1,Summit,Barberton,,,"17 5th ST SE, Barberton, Ohio, 44203",41.009826,-81.587719
124,1,Trumbull,Warren (Mahoning),,,"2750 Mahoning Ave NW, Ste 9, Warren, Ohio, 44483",41.260396,-80.833382
126,1,Tuscarawas,New Philadelphia,,,"1260 Monroe St NW Ste 11F, New Philadelphia, Ohio, 44663",40.506449,-81.457613`;

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  const regionMap = {
    '1': 'Northeast',
    '2': 'Central',
    '3': 'South',
    '4': 'Northwest'
  };
  
  return lines.slice(1).map((line, index) => {
    // Handle quoted commas in addresses
    const regex = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;
    const values = line.split(regex).map(v => v.replace(/^"|"$/g, '').trim());
    
    const id = parseInt(values[0]);
    const regionNum = values[1];
    const county = values[2];
    const city = values[3];
    const impressions = values[4] ? parseInt(values[4]) : 0;
    const rateStr = values[5];
    const address = values[6];
    const lat = parseFloat(values[7]);
    const lng = parseFloat(values[8]);
    
    // Parse rate (remove $ and parse as float)
    let rate = 0;
    if (rateStr && rateStr !== '') {
      rate = parseFloat(rateStr.replace('$', '').replace(',', ''));
    }
    
    // Map region number to region name
    const region = regionMap[regionNum] || 'Central';
    
    return {
      id: id,
      city: city,
      county: county,
      region: region,
      impressions: impressions,
      rate: rate,
      lat: lat,
      lng: lng,
      address: address
    };
  }).filter(loc => loc.lat && loc.lng); // Only include locations with valid coordinates
}
