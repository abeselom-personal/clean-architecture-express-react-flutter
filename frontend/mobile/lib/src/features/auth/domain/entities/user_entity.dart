import 'package:equatable/equatable.dart';

class UserEntity extends Equatable {
  final String? id;
  final String? name;
  final String? email;
  final String? password;

  const UserEntity({
    this.id,
    required this.name,
    required this.email,
    required this.password,
  });

  @override
  List<Object?> get props => [id, email, name, password];
}
