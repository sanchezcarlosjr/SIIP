<!DOCTYPE html>
<html lang="en">
<head>
    @include('includes.head')
    @yield('head')
</head>
<body>
	<div class="wrapper">
		<div class="main-header">
			@include('includes.header')
			@include('includes.navbar')
		</div>
		@include('layouts.sidebar')
		<div class="main-panel">
			<div class="content">
				<div class="page-inner">
					<div class="page-header">
						<h4 class="page-title"> @yield('page-title')</h4>
					</div>
					<div class="row">
							<div class="col-md-12">
								<div class="card">
									<div class="card-header">
										<div class="card-title">@yield('card-title')</div>
                                    </div>
                                    @yield('card')				
								</div>
							</div>
					</div>
				</div>
            </div>
              @include('layouts.footer')
		</div>
	</div>
  @include('includes.script')
  @yield('scripts')
</body>
</html>