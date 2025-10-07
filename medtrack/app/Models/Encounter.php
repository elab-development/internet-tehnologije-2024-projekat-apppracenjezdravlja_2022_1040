<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Encounter extends Model
{protected $fillable = ['patient_id','user_id','visit_time','type','notes','status'];

public function patient()
{
    return $this->belongsTo(\App\Models\Patient::class);
}
public function clinician() // lekar/sestra
{
    return $this->belongsTo(\App\Models\User::class, 'user_id');
}
public function vitalSigns()
{
    return $this->hasMany(\App\Models\VitalSign::class);
}
}
