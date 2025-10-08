<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForceJsonResponse
{
    public function handle(Request $request, Closure $next)
    {
        // Kažemo aplikaciji da klijent očekuje JSON
        $request->headers->set('Accept', 'application/json');
        return $next($request);
    }
}
