## Pertanyaan

> Jika dalam 1 projek terdapat 3 branch pada repository
>
> 1. Development : terdapat penambahan fitur A
> 2. QA : sedang testing fitur B
> 3. Production : ditemukan issue yang harus diperbaiki saat itu juga
>
> Jelaskan apa yang harus dilakukan supaya issue dapat diperbaiki serta branch QA & Development tidak terjadi conflict dan tetap up-to-date terhadap perbaikan issue?

## Jawaban

### A. Menyelesaikan Bug Production

Ketika ada bug di production maka langkah yang harus dilakukan adalah:

1. buat Hotfix branch yang bersumber dari Production (nama branch sesuai pada soal)

```bash
# contoh branch utama Production
git checkout Production
git pull origin Production
git checkout -b hotfix/fix-new-bug
```

2. Perbaiki bug dan commit ke hotfix, usahakan menulis unit testing
3. Sebelum di merge ke main, idealnya di test dulu di environment QA jika tidak mendesak
4. Jika QA approve maka bisa membuat pull request ke branch Production
5. Jangan lupa merge ke branch Development
6. Branch QA mengambil perubahan ketika ada pull request atau merge dari branch Development

### B. Menghindari konflik

1. Update kode lokal secara rutin dengan branch remote development
2. Membuat branch per fitur
3. Menghindari mengedit file yang sama (banyak orang mengedit file yang sama)
4. Jika conflict tidak bisa dihindarkan, gunakan tools merge biasanya editor modern mempunyai fitur untuk mempermudah menyelesaikan conflict
5. Segera review pull request untuk meminimalisir potensi terjadinya conflict, karena banyak perubahan di branch lain
