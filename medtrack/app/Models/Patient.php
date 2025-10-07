<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{protected $fillable = ['user_id','first_name','last_name','date_of_birth','gender','blood_type','phone','address'];

public function user()
{
    return $this->belongsTo(\App\Models\User::class);
}
public function encounters()
{
    return $this->hasMany(\App\Models\Encounter::class);
}
}
