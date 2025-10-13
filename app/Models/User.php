<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'analyses_reset_date' => 'date',
        ];
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class)->where('status', 'active');
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function tokenAnalyses()
    {
        return $this->hasMany(TokenAnalysis::class);
    }

    public function wallets()
    {
        return $this->hasMany(Wallet::class);
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class);
    }

    public function currentPlan()
    {
        return $this->subscription?->plan ?? Plan::where('slug', 'free')->first();
    }

    public function canAnalyze(): bool
    {
        $plan = $this->currentPlan();
        
        // Reset counter if new day
        if (!$this->analyses_reset_date || $this->analyses_reset_date->isYesterday()) {
            $this->update([
                'analyses_today' => 0,
                'analyses_reset_date' => today(),
            ]);
        }

        return $this->analyses_today < $plan->analyses_per_day;
    }

    public function incrementAnalysesCount(): void
    {
        $this->increment('analyses_today');
    }

    public function canAddWallet(): bool
    {
        $plan = $this->currentPlan();
        return $this->wallets()->count() < $plan->monitored_wallets;
    }
}
