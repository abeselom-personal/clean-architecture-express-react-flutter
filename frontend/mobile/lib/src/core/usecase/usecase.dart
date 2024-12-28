import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import '../network/errors/failures.dart';

abstract class UseCase<T, Params> {
  Future<Either<Failure, T>> call(Params? params);
}

class NoParams extends Equatable {
  @override
  // TODO: implement props
  List<Object?> get props => [];
}
