	var jobControllers = angular.module("jobControllers",[]);
	
	jobControllers.controller('CreateController',
		function($scope,$http,Data) {
			$scope.Data = Data;

			$scope.processForm = function(){

				$http({
					method : 'POST',
					url : 'http://astrotalks.org/jobs/api/create_job.php',
					data: $scope.jobInfo,
					headers : { 'Content-Type':'application/json' }
				})
				.success(function(data) {
					console.log("success");

				});
			}
		}
	);

	jobControllers.controller('ListController',
		function($scope,$http, Data){
			$scope.Data = Data;

			var OnJobComplete =  function(response){
				$scope.jobList = response.data['msg'];			
				$scope.orderCriteria = 	"institution";
				$scope.reverseOption = false;

				for (var i = 0 ; i < $scope.jobList.length ; i++){
					var num = $scope.jobList[i].position;
					var accr = $scope.jobList[i].country;
					$scope.jobList[i].position= Data.positionOptions[num].names;
					$scope.jobList[i].country = Data.countryOptions[accr].name;
				}
			}

			$scope.orderJobList = function(sortvariable){
				if ($scope.orderCriteria == sortvariable){
					if ($scope.reverseOption == false){
						$scope.reverseOption = true;
					} else {
						$scope.reverseOption = false;
					}
				} else {
					$scope.reverseOption = false;
				}
				$scope.orderCriteria = sortvariable;
			} 

			var OnError =  function(reason){
				$scope.error = reason;
			}

			$http.get("http://astrotalks.org/jobs/api/list_job.php")
				.then(OnJobComplete,OnError);
		});

	jobControllers.controller('DetailController',
		function($scope,$http,$routeParams, Data){
			$scope.Data = Data;
			$scope.jobid = $routeParams.jobid;
			
			var OnInfoComplete = function(response){
				$scope.jobInfo = response.data.msg;	
				console.log($scope.jobInfo);		
			}

			var OnError =  function(reason){
				$scope.error = reason;
			}

			$http.get("http://astrotalks.org/jobs/api/view_job.php?jobid=" + $scope.jobid )
				.then(OnInfoComplete, OnError);
			
		});

	jobControllers.controller('EditController',
		function($scope,$http,$routeParams,Data){
			$scope.jobid = $routeParams.jobid;
			$scope.Data = Data;
			var OnInfoComplete = function(response){
				$scope.jobInfo = response.data.msg;	
				console.log($scope.jobInfo);
				
				//$scope.jobInfo.position = Data.positionOptions[$scope.jobInfo.position].names;
				// $scope.jobInfo.country = Data.countryOptions[$scope.jobInfo.country].name;
				
			}
			var OnError =  function(reason){
				$scope.error = reason;
			}

			$http.get("http://astrotalks.org/jobs/api/edit_job.php?jobid=" + $scope.jobid )
				.then(OnInfoComplete,OnError);

			// $scope.editForm = function(){

			// 	$http({
			// 		method : 'POST',
			// 		url : 'http://astrotalks.org/jobs/api/edit_job.php?jobid=' + $scope.jobid,
			// 		data: $scope.jobInfo,
			// 		headers : { 'Content-Type':'application/json' }
			// 	})
			// 	.success(function(data) {
			// 		console.log("success");

			// 	});
			// }
		});

	jobControllers.factory('Data', 
		function(){
			var selectOptions = {};
			selectOptions['positionOptions'] = {
					'1': {names:'Faculty/Scientific Staff', codes:'1'}, 
					'2': {names:'Graduate', codes: '2'}, 
					'3': {names:'PostDoc and Fellowships', codes: '3'},
			 		'4': {names:'Software and Engineering',codes:'4'},
			 		'5': {names:'Management',codes:'5'},
			 		'6': {names:'Private Companies', codes:'6'},
			 		'7': {names:'Others',codes:'7'}
	 				};
	 		selectOptions['countryOptions'] = {
		 			 'AF':{name: 'Afghanistan', code: 'AF'},
					 'AX':{name: 'Åland Islands', code: 'AX'},
					 'AL':{name: 'Albania', code: 'AL'},
					 'DZ':{name: 'Algeria', code: 'DZ'},
					 'AS':{name: 'American Samoa', code: 'AS'},
					 'AD':{name: 'Andorra', code: 'AD'},
					 'AO':{name: 'Angola', code: 'AO'},
					 'AI':{name: 'Anguilla', code: 'AI'},
					 'AQ':{name: 'Antarctica', code: 'AQ'},
					 'AG':{name: 'Antigua and Barbuda', code: 'AG'},
					 'AR':{name: 'Argentina', code: 'AR'},
					 'AM':{name: 'Armenia', code: 'AM'},
					 'AW':{name: 'Aruba', code: 'AW'},
					 'AU':{name: 'Australia', code: 'AU'},
					 'AT':{name: 'Austria', code: 'AT'},
					 'AZ':{name: 'Azerbaijan', code: 'AZ'},
					 'BS':{name: 'Bahamas', code: 'BS'},
					 'BH':{name: 'Bahrain', code: 'BH'},
					 'BD':{name: 'Bangladesh', code: 'BD'},
					 'BB':{name: 'Barbados', code: 'BB'},
					 'BY':{name: 'Belarus', code: 'BY'},
					 'BE':{name: 'Belgium', code: 'BE'},
					 'BZ':{name: 'Belize', code: 'BZ'},
					 'BJ':{name: 'Benin', code: 'BJ'},
					 'BM':{name: 'Bermuda', code: 'BM'},
					 'BT':{name: 'Bhutan', code: 'BT'},
					 'BO':{name: 'Bolivia', code: 'BO'},
					 'BA':{name: 'Bosnia and Herzegovina', code: 'BA'},
					 'BW':{name: 'Botswana', code: 'BW'},
					 'BV':{name: 'Bouvet Island', code: 'BV'},
					 'BR':{name: 'Brazil', code: 'BR'},
					 'IO':{name: 'British Indian Ocean Territory', code: 'IO'},
					 'BN':{name: 'Brunei Darussalam', code: 'BN'},
					 'BG':{name: 'Bulgaria', code: 'BG'},
					 'BF':{name: 'Burkina Faso', code: 'BF'},
					 'BI':{name: 'Burundi', code: 'BI'},
					 'KH':{name: 'Cambodia', code: 'KH'},
					 'CM':{name: 'Cameroon', code: 'CM'},
					 'CA':{name: 'Canada', code: 'CA'},
					 'CV':{name: 'Cape Verde', code: 'CV'},
					 'KY':{name: 'Cayman Islands', code: 'KY'},
					 'CF':{name: 'Central African Republic', code: 'CF'},
					 'TD':{name: 'Chad', code: 'TD'},
					 'CL':{name: 'Chile', code: 'CL'},
					 'CN':{name: 'China', code: 'CN'},
					 'CX':{name: 'Christmas Island', code: 'CX'},
					 'CC':{name: 'Cocos (Keeling) Islands', code: 'CC'},
					 'CO':{name: 'Colombia', code: 'CO'},
					 'KM':{name: 'Comoros', code: 'KM'},
					 'CG':{name: 'Congo', code: 'CG'},
					 'CD':{name: 'Congo, The Democratic Republic of the', code: 'CD'},
					 'CK':{name: 'Cook Islands', code: 'CK'},
					 'CR':{name: 'Costa Rica', code: 'CR'},
					 'CI':{name: 'Cote DIvoire', code: 'CI'},
					 'HR':{name: 'Croatia', code: 'HR'},
					 'CU':{name: 'Cuba', code: 'CU'},
					 'CY':{name: 'Cyprus', code: 'CY'},
					 'CZ':{name: 'Czech Republic', code: 'CZ'},
					 'DK':{name: 'Denmark', code: 'DK'},
					 'DJ':{name: 'Djibouti', code: 'DJ'},
					 'DM':{name: 'Dominica', code: 'DM'},
					 'DO':{name: 'Dominican Republic', code: 'DO'},
					 'EC':{name: 'Ecuador', code: 'EC'},
					 'EG':{name: 'Egypt', code: 'EG'},
					 'SV':{name: 'El Salvador', code: 'SV'},
					 'GQ':{name: 'Equatorial Guinea', code: 'GQ'},
					 'ER':{name: 'Eritrea', code: 'ER'},
					 'EE':{name: 'Estonia', code: 'EE'},
					 'ET':{name: 'Ethiopia', code: 'ET'},
					 'FK':{name: 'Falkland Islands (Malvinas)', code: 'FK'},
					 'FO':{name: 'Faroe Islands', code: 'FO'},
					 'FJ':{name: 'Fiji', code: 'FJ'},
					 'FI':{name: 'Finland', code: 'FI'},
					 'FR':{name: 'France', code: 'FR'},
					 'GF':{name: 'French Guiana', code: 'GF'},
					 'PF':{name: 'French Polynesia', code: 'PF'},
					 'TF':{name: 'French Southern Territories', code: 'TF'},
					 'GA':{name: 'Gabon', code: 'GA'},
					 'GM':{name: 'Gambia', code: 'GM'},
					 'GE':{name: 'Georgia', code: 'GE'},
					 'DE':{name: 'Germany', code: 'DE'},
					 'GH':{name: 'Ghana', code: 'GH'},
					 'GI':{name: 'Gibraltar', code: 'GI'},
					 'GR':{name: 'Greece', code: 'GR'},
					 'GL':{name: 'Greenland', code: 'GL'},
					 'GD':{name: 'Grenada', code: 'GD'},
					 'GP':{name: 'Guadeloupe', code: 'GP'},
					 'GU':{name: 'Guam', code: 'GU'},
					 'GT':{name: 'Guatemala', code: 'GT'},
					 'GG':{name: 'Guernsey', code: 'GG'},
					 'GN':{name: 'Guinea', code: 'GN'},
					 'GW':{name: 'Guinea-Bissau', code: 'GW'},
					 'GY':{name: 'Guyana', code: 'GY'},
					 'HT':{name: 'Haiti', code: 'HT'},
					 'HM':{name: 'Heard Island and Mcdonald Islands', code: 'HM'},
					 'VA':{name: 'Holy See (Vatican City State)', code: 'VA'},
					 'HN':{name: 'Honduras', code: 'HN'},
					 'HK':{name: 'Hong Kong', code: 'HK'},
					 'HU':{name: 'Hungary', code: 'HU'},
					 'IS':{name: 'Iceland', code: 'IS'},
					 'IN':{name: 'India', code: 'IN'},
					 'ID':{name: 'Indonesia', code: 'ID'},
					 'IR':{name: 'Iran, Islamic Republic Of', code: 'IR'},
					 'IQ':{name: 'Iraq', code: 'IQ'},
					 'IE':{name: 'Ireland', code: 'IE'},
					 'IM':{name: 'Isle of Man', code: 'IM'},
					 'IL':{name: 'Israel', code: 'IL'},
					 'IT':{name: 'Italy', code: 'IT'},
					 'JM':{name: 'Jamaica', code: 'JM'},
					 'JP':{name: 'Japan', code: 'JP'},
					 'JE':{name: 'Jersey', code: 'JE'},
					 'JO':{name: 'Jordan', code: 'JO'},
					 'KZ':{name: 'Kazakhstan', code: 'KZ'},
					 'KE':{name: 'Kenya', code: 'KE'},
					 'KI':{name: 'Kiribati', code: 'KI'},
					 'KP':{name: 'Korea, Democratic Peoples Republic of', code: 'KP'},
					 'KR':{name: 'Korea, Republic of', code: 'KR'},
					 'KW':{name: 'Kuwait', code: 'KW'},
					 'KG':{name: 'Kyrgyzstan', code: 'KG'},
					 'LA':{name: 'Lao Peoples Democratic Republic', code: 'LA'},
					 'LV':{name: 'Latvia', code: 'LV'},
					 'LB':{name: 'Lebanon', code: 'LB'},
					 'LS':{name: 'Lesotho', code: 'LS'},
					 'LR':{name: 'Liberia', code: 'LR'},
					 'LY':{name: 'Libyan Arab Jamahiriya', code: 'LY'},
					 'LI':{name: 'Liechtenstein', code: 'LI'},
					 'LT':{name: 'Lithuania', code: 'LT'},
					 'LU':{name: 'Luxembourg', code: 'LU'},
					 'MO':{name: 'Macao', code: 'MO'},
					 'MK':{name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
					 'MG':{name: 'Madagascar', code: 'MG'},
					 'MW':{name: 'Malawi', code: 'MW'},
					 'MY':{name: 'Malaysia', code: 'MY'},
					 'MV':{name: 'Maldives', code: 'MV'},
					 'ML':{name: 'Mali', code: 'ML'},
					 'MT':{name: 'Malta', code: 'MT'},
					 'MH':{name: 'Marshall Islands', code: 'MH'},
					 'MQ':{name: 'Martinique', code: 'MQ'},
					 'MR':{name: 'Mauritania', code: 'MR'},
					 'MU':{name: 'Mauritius', code: 'MU'},
					 'YT':{name: 'Mayotte', code: 'YT'},
					 'MX':{name: 'Mexico', code: 'MX'},
					 'FM':{name: 'Micronesia, Federated States of', code: 'FM'},
					 'MD':{name: 'Moldova, Republic of', code: 'MD'},
					 'MC':{name: 'Monaco', code: 'MC'},
					 'MN':{name: 'Mongolia', code: 'MN'},
					 'MS':{name: 'Montserrat', code: 'MS'},
					 'MA':{name: 'Morocco', code: 'MA'},
					 'MZ':{name: 'Mozambique', code: 'MZ'},
					 'MM':{name: 'Myanmar', code: 'MM'},
					 'NA':{name: 'Namibia', code: 'NA'},
					 'NR':{name: 'Nauru', code: 'NR'},
					 'NP':{name: 'Nepal', code: 'NP'},
					 'NL':{name: 'Netherlands', code: 'NL'},
					 'AN':{name: 'Netherlands Antilles', code: 'AN'},
					 'NC':{name: 'New Caledonia', code: 'NC'},
					 'NZ':{name: 'New Zealand', code: 'NZ'},
					 'NI':{name: 'Nicaragua', code: 'NI'},
					 'NE':{name: 'Niger', code: 'NE'},
					 'NG':{name: 'Nigeria', code: 'NG'},
					 'NU':{name: 'Niue', code: 'NU'},
					 'NF':{name: 'Norfolk Island', code: 'NF'},
					 'MP':{name: 'Northern Mariana Islands', code: 'MP'},
					 'NO':{name: 'Norway', code: 'NO'},
					 'OM':{name: 'Oman', code: 'OM'},
					 'PK':{name: 'Pakistan', code: 'PK'},
					 'PW':{name: 'Palau', code: 'PW'},
					 'PS':{name: 'Palestinian Territory, Occupied', code: 'PS'},
					 'PA':{name: 'Panama', code: 'PA'},
					 'PG':{name: 'Papua New Guinea', code: 'PG'},
					 'PY':{name: 'Paraguay', code: 'PY'},
					 'PE':{name: 'Peru', code: 'PE'},
					 'PH':{name: 'Philippines', code: 'PH'},
					 'PN':{name: 'Pitcairn', code: 'PN'},
					 'PL':{name: 'Poland', code: 'PL'},
					 'PT':{name: 'Portugal', code: 'PT'},
					 'PR':{name: 'Puerto Rico', code: 'PR'},
					 'QA':{name: 'Qatar', code: 'QA'},
					 'RE':{name: 'Reunion', code: 'RE'},
					 'RO':{name: 'Romania', code: 'RO'},
					 'RU':{name: 'Russian Federation', code: 'RU'},
					 'RW':{name: 'Rwanda', code: 'RW'},
					 'SH':{name: 'Saint Helena', code: 'SH'},
					 'KN':{name: 'Saint Kitts and Nevis', code: 'KN'},
					 'LC':{name: 'Saint Lucia', code: 'LC'},
					 'PM':{name: 'Saint Pierre and Miquelon', code: 'PM'},
					 'VC':{name: 'Saint Vincent and the Grenadines', code: 'VC'},
					 'WS':{name: 'Samoa', code: 'WS'},
					 'SM':{name: 'San Marino', code: 'SM'},
					 'ST':{name: 'Sao Tome and Principe', code: 'ST'},
					 'SA':{name: 'Saudi Arabia', code: 'SA'},
					 'SN':{name: 'Senegal', code: 'SN'},
					 'CS':{name: 'Serbia and Montenegro', code: 'CS'},
					 'SC':{name: 'Seychelles', code: 'SC'},
					 'SL':{name: 'Sierra Leone', code: 'SL'},
					 'SG':{name: 'Singapore', code: 'SG'},
					 'SK':{name: 'Slovakia', code: 'SK'},
					 'SI':{name: 'Slovenia', code: 'SI'},
					 'SB':{name: 'Solomon Islands', code: 'SB'},
					 'SO':{name: 'Somalia', code: 'SO'},
					 'ZA':{name: 'South Africa', code: 'ZA'},
					 'GS':{name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
					 'ES':{name: 'Spain', code: 'ES'},
					 'LK':{name: 'Sri Lanka', code: 'LK'},
					 'SD':{name: 'Sudan', code: 'SD'},
					 'SR':{name: 'Suriname', code: 'SR'},
					 'SJ':{name: 'Svalbard and Jan Mayen', code: 'SJ'},
					 'SZ':{name: 'Swaziland', code: 'SZ'},
					 'SE':{name: 'Sweden', code: 'SE'},
					 'CH':{name: 'Switzerland', code: 'CH'},
					 'SY':{name: 'Syrian Arab Republic', code: 'SY'},
					 'TW':{name: 'Taiwan, Province of China', code: 'TW'},
					 'TJ':{name: 'Tajikistan', code: 'TJ'},
					 'TZ':{name: 'Tanzania, United Republic of', code: 'TZ'},
					 'TH':{name: 'Thailand', code: 'TH'},
					 'TL':{name: 'Timor-Leste', code: 'TL'},
					 'TG':{name: 'Togo', code: 'TG'},
					 'TK':{name: 'Tokelau', code: 'TK'},
					 'TO':{name: 'Tonga', code: 'TO'},
					 'TT':{name: 'Trinidad and Tobago', code: 'TT'},
					 'TN':{name: 'Tunisia', code: 'TN'},
					 'TR':{name: 'Turkey', code: 'TR'},
					 'TM':{name: 'Turkmenistan', code: 'TM'},
					 'TC':{name: 'Turks and Caicos Islands', code: 'TC'},
					 'TV':{name: 'Tuvalu', code: 'TV'},
					 'UG':{name: 'Uganda', code: 'UG'},
					 'UA':{name: 'Ukraine', code: 'UA'},
					 'AE':{name: 'United Arab Emirates', code: 'AE'},
					 'GB':{name: 'United Kingdom', code: 'GB'},
					 'US':{name: 'United States', code: 'US'},
					 'UM':{name: 'United States Minor Outlying Islands', code: 'UM'},
					 'UY':{name: 'Uruguay', code: 'UY'},
					 'UZ':{name: 'Uzbekistan', code: 'UZ'},
					 'VU':{name: 'Vanuatu', code: 'VU'},
					 'VE':{name: 'Venezuela', code: 'VE'},
					 'VN':{name: 'Vietnam', code: 'VN'},
					 'VG':{name: 'Virgin Islands, British', code: 'VG'},
					 'VI':{name: 'Virgin Islands, U.S.', code: 'VI'},
					 'WF':{name: 'Wallis and Futuna', code: 'WF'},
					 'EH':{name: 'Western Sahara', code: 'EH'},
					 'YE':{name: 'Yemen', code: 'YE'},
					 'ZM':{name: 'Zambia', code: 'ZM'}
					};
	 		return selectOptions;
	 });



	

