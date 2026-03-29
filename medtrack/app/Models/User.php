<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
    'name','email','password','role','patient_id'
];

public function patient()
{
    return $this->belongsTo(\App\Models\Patient::class);
}

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    public function encounters()
    {
        return $this->hasMany(\App\Models\Encounter::class, 'user_id');
    }
    
    public function patientProfile()
    {
        return $this->hasOne(\App\Models\Patient::class, 'user_id');
    }
}