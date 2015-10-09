	var jobControllers = angular.module("jobControllers",[]);

	jobControllers.controller('CreateController',['$scope','$http', 
		function($scope,$http) {
			$scope.processForm = function(){
				//$scope.jobInfo.start_date = new Date();
				
				//for firefox that doesnot support input='date' as it converts date to string
				/*$scope.$watch('jobInfo.start_date', function (jobInfo.start_date){
        	$scope.dateString = dateFilter(jobInfo.start_date, 'yyyy-MM-dd');
    		});

    		$scope.$watch('dateString', function (dateString){
        	$scope.jobInfo.start_date = new Date(dateString);
    		});
				*/
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
	]);
	
	jobControllers.controller('ListController',['$scope','$http',
		function($scope,$http){
			var OnJobComplete =  function(response){
				$scope.jobList = response.data['msg'];	
				$scope.orderCriteria = 	"institution";
				$scope.reverseOption = false;
				console.log($scope.jobList);
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
				console.log($scope.jobList);
			} 

			var OnError =  function(reason){
				$scope.error = reason;
			}

			$http.get("http://astrotalks.org/jobs/api/list_job.php")
				.then(OnJobComplete,OnError);
	
		}
	]);

	jobControllers.controller('DetailController', ['$scope', '$http','$routeParams',
		function($scope,$http,$routeParams){
			$scope.jobid = $routeParams.jobid;


			$http.get("http://astrotalks.org/jobs/api/view_job.php?jobid=" + $scope.jobid )
			.success(function(data) {
      	$scope.jobInfo = data;
    });
			
		
		}
	]);



	

