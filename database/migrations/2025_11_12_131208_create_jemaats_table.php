<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jemaats', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('alamat')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->enum('jenis_kelamin', ['L', 'P'])->nullable();
            $table->string('telepon')->nullable();
            $table->string('email')->nullable();
            $table->unsignedBigInteger('pelayanan_id')->nullable();
            $table->unsignedBigInteger('keluarga_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pelayanan_id')->references('id')->on('pelayanans')->nullOnDelete();
            $table->foreign('keluarga_id')->references('id')->on('keluargas')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jemaats');
    }
};
